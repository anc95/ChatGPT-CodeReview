// 审查流水线骨架：把 输入 → context → review → risk 串起来，产出 ReviewResult。
// 各阶段默认使用 mock 实现，支持离线联调；真实实现由对应模块成员提供后替换。

import type {
  PRInput,
  ContextSnippet,
  Finding,
  Risk,
  Gate,
  ReviewResult,
  RunRecord,
} from './types.js';
import {
  mockContextSnippets,
  mockFindings,
  mockRisk,
  mockGate,
} from './mocks.js';

// 各阶段的接口定义（契约），真实实现签名必须与这里一致。
export interface ContextProvider {
  (input: PRInput): Promise<ContextSnippet[]>;
}

export interface ReviewProvider {
  (input: PRInput, context: ContextSnippet[]): Promise<Finding[]>;
}

export interface RiskProvider {
  (input: PRInput, findings: Finding[]): Promise<{ risk: Risk; gate: Gate }>;
}

// 默认 mock 实现
const mockContext: ContextProvider = async () => mockContextSnippets;
const mockReview: ReviewProvider = async () => mockFindings;
const mockRiskProvider: RiskProvider = async () => ({
  risk: mockRisk,
  gate: mockGate,
});

export async function runReviewPipeline(
  input: PRInput,
  providers: {
    context?: ContextProvider;
    review?: ReviewProvider;
    risk?: RiskProvider;
  } = {}
): Promise<{ result: ReviewResult; record: RunRecord }> {
  const startedAt = Date.now();

  const contextProvider = providers.context ?? mockContext;
  const reviewProvider = providers.review ?? mockReview;
  const riskProvider = providers.risk ?? mockRiskProvider;

  // 1. 提取上下文
  const context = await contextProvider(input);

  // 2. 模型审查，产出 findings
  const findings = await reviewProvider(input, context);

  // 3. 风险评估与门禁
  const { risk, gate } = await riskProvider(input, findings);

  const result: ReviewResult = {
    headSha: input.headSha,
    mode: 'context',
    analysisStatus: 'COMPLETE',
    scope: input.changedFiles.map((f) => f.filename),
    omissions: [],
    findings,
    risk,
    gate,
  };

  const record: RunRecord = {
    model: process.env.MODEL || 'gpt-4o-mini',
    modelParams: {},
    promptVersion: 'v1',
    ruleVersion: risk.ruleVersion,
    durationMs: Date.now() - startedAt,
  };

  return { result, record };
}

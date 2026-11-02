// 统一数据类型 —— 依据 TECH_SPEC「统一数据」表。
// 这是各模块之间协作的接口契约，所有模块的输入输出都对齐这里。

export type Severity = 'low' | 'medium' | 'high';
export type Mode = 'diff-only' | 'context';
export type AnalysisStatus = 'COMPLETE' | 'PARTIAL' | 'FAILED';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'UNKNOWN';
export type Side = 'LEFT' | 'RIGHT';

// PR 输入
export interface ChangedFile {
  filename: string;
  status: string;
  patch?: string;
}

export interface PRInput {
  repo: string;
  prNumber: number;
  baseSha: string;
  diffBaseSha: string;
  headSha: string;
  diff: string;
  changedFiles: ChangedFile[];
}

// 上下文片段（Context-Aware 模块产出）
export interface ContextSnippet {
  id: string;
  file: string;
  ref: string; // 所属版本的 SHA
  startLine: number;
  endLine: number;
  code: string;
  reason: string; // 为什么选这段作为上下文
}

// 发现（模型审查模块产出）
export interface Finding {
  id: string;
  file: string;
  side: Side;
  line: number | null; // 可空：无有效行号时
  severity: Severity;
  message: string;
  evidenceIds: string[]; // 引用的 ContextSnippet id
}

// 风险（Risk 模块产出）
export interface Risk {
  level: RiskLevel;
  factors: string[]; // 触发的规则/因素
  ruleVersion: string;
}

// 门禁（Gate 模块产出）
export interface Gate {
  status: 'pass' | 'pending' | 'failure';
  reason: string;
  requiredApprovals: number;
}

// 最终审查结果
export interface ReviewResult {
  headSha: string;
  mode: Mode;
  analysisStatus: AnalysisStatus;
  scope: string[]; // 声明支持的范围
  omissions: string[]; // 披露的裁剪/缺失
  findings: Finding[];
  risk: Risk;
  gate: Gate;
}

// 运行记录
export interface RunRecord {
  model: string;
  modelParams: Record<string, unknown>;
  promptVersion: string;
  ruleVersion: string;
  durationMs: number;
  usage?: unknown; // 缺失时标未知
}

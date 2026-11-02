// 固定模拟响应 —— 用于离线联调，不调真实模型、不联网。
// 其他模块实现完成后，用真实实现替换这些 mock 即可。

import type {
  PRInput,
  ContextSnippet,
  Finding,
  Risk,
  Gate,
} from './types.js';

export const mockPRInput: PRInput = {
  repo: 'CS5351-inspector/context-aware-risk-gated-code-review',
  prNumber: 1,
  baseSha: 'base-sha',
  diffBaseSha: 'diff-base-sha',
  headSha: 'head-sha',
  diff: '@@ -1,3 +1,4 @@\n-old\n+new',
  changedFiles: [
    {
      filename: 'src/bot.ts',
      status: 'modified',
      patch: '@@ -1,3 +1,4 @@\n-old\n+new',
    },
  ],
};

export const mockContextSnippets: ContextSnippet[] = [
  {
    id: 'ctx-1',
    file: 'src/bot.ts',
    ref: 'head-sha',
    startLine: 1,
    endLine: 10,
    code: 'function example() {\n  return 1;\n}',
    reason: '修改处所在函数的定义',
  },
];

export const mockFindings: Finding[] = [
  {
    id: 'f-1',
    file: 'src/bot.ts',
    side: 'RIGHT',
    line: 3,
    severity: 'high',
    message: '示例 finding：变量未初始化',
    evidenceIds: ['ctx-1'],
  },
];

export const mockRisk: Risk = {
  level: 'HIGH',
  factors: ['改动涉及敏感路径 src/bot.ts'],
  ruleVersion: 'v1',
};

export const mockGate: Gate = {
  status: 'pending',
  reason: '存在 HIGH 风险，等待人工批准',
  requiredApprovals: 1,
};

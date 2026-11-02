import { runReviewPipeline } from '../src/pipeline';
import {
  mockPRInput,
  mockFindings,
  mockRisk,
  mockGate,
} from '../src/mocks';

describe('runReviewPipeline（离线联调）', () => {
  test('用 mock 响应跑通 输入→context→review→risk 整条链路', async () => {
    const { result, record } = await runReviewPipeline(mockPRInput);

    expect(result.headSha).toBe(mockPRInput.headSha);
    expect(result.analysisStatus).toBe('COMPLETE');
    expect(result.scope).toEqual(['src/bot.ts']);
    expect(result.findings).toEqual(mockFindings);
    expect(result.risk).toEqual(mockRisk);
    expect(result.gate).toEqual(mockGate);
    expect(record.durationMs).toBeGreaterThanOrEqual(0);
  });

  test('允许替换单个阶段为自定义实现', async () => {
    const customReview = async () => [];
    const { result } = await runReviewPipeline(mockPRInput, {
      review: customReview,
    });

    expect(result.findings).toEqual([]);
  });
});

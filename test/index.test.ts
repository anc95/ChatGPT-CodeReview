import {
  createInlineReviewComment,
  createReviewBody,
  getChangedFiles,
  getReviewCommentLocation,
  isHunkHeaderInPatch,
  robot,
} from '../src/bot';

const pullRequestFiles = [
  {
    filename: 'src/current.ts',
    status: 'modified',
    contents_url: 'https://api.github.com/repos/owner/repo/contents/src/current.ts',
    patch: 'current pull request patch',
  },
  {
    filename: 'src/incremental.ts',
    status: 'modified',
    contents_url: 'https://api.github.com/repos/owner/repo/contents/src/incremental.ts',
    patch: 'incremental pull request patch',
  },
];

const incrementalFiles = [
  {
    filename: 'src/incremental.ts',
    status: 'modified',
    contents_url: 'https://api.github.com/repos/owner/repo/contents/src/incremental.ts',
    patch: 'commit comparison patch',
  },
];

const unrelatedFiles = [
  {
    filename: 'README.md',
    status: 'modified',
    contents_url: 'https://api.github.com/repos/owner/repo/contents/README.md',
    patch: 'unrelated comparison patch',
  },
];

const patch = [
  '@@ -10,2 +10,3 @@ function example() {',
  ' unchanged',
  '-old',
  '+new',
  '+added',
  '@@ -20,3 +21,0 @@ function removed() {',
  '-one',
  '-two',
  '-three',
].join('\n');

const createBotReview = (
  body = 'Code review by ChatGPT',
  commitId: string | null = 'reviewed-head'
) => ({
  body: `${body}\n\n<!-- chatgpt-code-review -->`,
  commit_id: commitId,
  user: { type: 'Bot' },
});

const createContext = ({
  action = 'synchronize',
  before = 'previous-head',
  reviews = [],
  comparisons = [],
  reviewsError,
}: {
  action?: 'opened' | 'synchronize';
  before?: string;
  reviews?: Array<{
    body: string;
    commit_id?: string | null;
    user?: { type: string };
  }>;
  comparisons?: Array<
    | {
        status: 'ahead' | 'behind' | 'diverged' | 'identical';
        files?: typeof pullRequestFiles;
      }
    | Error
  >;
  reviewsError?: Error;
} = {}) => {
  const compareCommits = jest.fn();
  const listFiles = jest.fn();
  const listReviews = jest.fn();
  const paginate = jest.fn((method) => {
    if (method === listFiles) {
      return Promise.resolve(pullRequestFiles);
    }
    if (method === listReviews) {
      if (reviewsError) {
        return Promise.reject(reviewsError);
      }
      return Promise.resolve(reviews);
    }
    return Promise.reject(new Error('unexpected pagination method'));
  });

  for (const comparison of comparisons) {
    if (comparison instanceof Error) {
      compareCommits.mockRejectedValueOnce(comparison);
    } else {
      compareCommits.mockResolvedValueOnce({ data: comparison });
    }
  }

  return {
    context: {
      repo: () => ({ owner: 'owner', repo: 'repo' }),
      pullRequest: () => ({
        owner: 'owner',
        repo: 'repo',
        pull_number: 123,
      }),
      payload: {
        action,
        before,
        pull_request: {
          head: { sha: 'current-head' },
        },
      },
      octokit: {
        paginate,
        pulls: {
          listFiles,
          listReviews,
        },
        repos: {
          compareCommits,
        },
      },
    } as any,
    compareCommits,
    listFiles,
    listReviews,
    paginate,
  };
};

describe('getChangedFiles', () => {
  test('uses the current pull request files when the pull request is opened', async () => {
    const { context, compareCommits } = createContext({ action: 'opened' });

    await expect(getChangedFiles(context)).resolves.toEqual(pullRequestFiles);
    expect(context.octokit.pulls.listReviews).not.toHaveBeenCalled();
    expect(compareCommits).not.toHaveBeenCalled();
  });

  test('uses current pull request patches for files in an incremental diff', async () => {
    const { context, compareCommits } = createContext({
      reviews: [createBotReview()],
      comparisons: [
        {
          status: 'ahead',
          files: incrementalFiles,
        },
      ],
    });

    await expect(getChangedFiles(context)).resolves.toEqual([
      pullRequestFiles[1],
    ]);
    expect(compareCommits).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      base: 'reviewed-head',
      head: 'current-head',
    });
  });

  test('ignores matching review text from a human reviewer', async () => {
    const { context, compareCommits } = createContext({
      reviews: [
        {
          body: 'LGTM 👍',
          commit_id: 'human-reviewed-head',
          user: { type: 'User' },
        },
      ],
      comparisons: [
        {
          status: 'ahead',
          files: incrementalFiles,
        },
      ],
    });

    await expect(getChangedFiles(context)).resolves.toEqual([
      pullRequestFiles[1],
    ]);
    expect(compareCommits).toHaveBeenCalledTimes(1);
    expect(compareCommits).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      base: 'previous-head',
      head: 'current-head',
    });
  });

  test('uses the full pull request for a legacy bot review without the marker', async () => {
    const { context, compareCommits } = createContext({
      reviews: [
        {
          body: 'Code review by ChatGPT',
          commit_id: 'legacy-reviewed-head',
          user: { type: 'Bot' },
        },
      ],
    });

    await expect(getChangedFiles(context)).resolves.toEqual(pullRequestFiles);
    expect(compareCommits).not.toHaveBeenCalled();
  });

  test('uses the full pull request when a trusted review has no commit', async () => {
    const { context, compareCommits } = createContext({
      reviews: [createBotReview('Code review by ChatGPT', null)],
    });

    await expect(getChangedFiles(context)).resolves.toEqual(pullRequestFiles);
    expect(compareCommits).not.toHaveBeenCalled();
  });

  test('uses the full pull request when review history cannot be listed', async () => {
    const { context, compareCommits } = createContext({
      reviewsError: new Error('reviews unavailable'),
    });

    await expect(getChangedFiles(context)).resolves.toEqual(pullRequestFiles);
    expect(compareCommits).not.toHaveBeenCalled();
  });

  test('excludes files that are only present in an ahead comparison', async () => {
    const { context } = createContext({
      reviews: [createBotReview()],
      comparisons: [
        {
          status: 'ahead',
          files: unrelatedFiles,
        },
      ],
    });

    await expect(getChangedFiles(context)).resolves.toEqual([]);
  });

  test('falls back when a comparison reaches the GitHub file limit', async () => {
    const comparisonFiles = Array.from({ length: 300 }, (_, index) => ({
      filename: `src/file-${index}.ts`,
      status: 'modified',
      contents_url: `https://api.github.com/repos/owner/repo/contents/src/file-${index}.ts`,
      patch: 'commit comparison patch',
    }));
    const { context } = createContext({
      reviews: [createBotReview()],
      comparisons: [
        {
          status: 'ahead',
          files: comparisonFiles,
        },
      ],
    });

    await expect(getChangedFiles(context)).resolves.toEqual(pullRequestFiles);
  });

  test('falls back when an ahead comparison omits files', async () => {
    const { context } = createContext({
      reviews: [createBotReview()],
      comparisons: [
        {
          status: 'ahead',
        },
      ],
    });

    await expect(getChangedFiles(context)).resolves.toEqual(pullRequestFiles);
  });

  test('returns no files for an identical comparison', async () => {
    const { context } = createContext({
      reviews: [createBotReview()],
      comparisons: [
        {
          status: 'identical',
        },
      ],
    });

    await expect(getChangedFiles(context)).resolves.toEqual([]);
  });

  test('falls back to the current pull request files after diverged comparisons', async () => {
    const { context, compareCommits } = createContext({
      reviews: [createBotReview()],
      comparisons: [
        {
          status: 'diverged',
          files: unrelatedFiles,
        },
      ],
    });

    await expect(getChangedFiles(context)).resolves.toEqual(pullRequestFiles);
    expect(compareCommits).toHaveBeenCalledTimes(1);
    expect(compareCommits).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      base: 'reviewed-head',
      head: 'current-head',
    });
  });

  test('uses the synchronize before SHA when no prior bot review exists', async () => {
    const { context, compareCommits } = createContext({
      comparisons: [
        {
          status: 'ahead',
          files: incrementalFiles,
        },
      ],
    });

    await expect(getChangedFiles(context)).resolves.toEqual([
      pullRequestFiles[1],
    ]);
    expect(compareCommits).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      base: 'previous-head',
      head: 'current-head',
    });
  });

  test('uses the full pull request when the trusted review comparison fails', async () => {
    const { context, compareCommits } = createContext({
      reviews: [createBotReview('LGTM 👍')],
      comparisons: [new Error('reviewed commit is unavailable')],
    });

    await expect(getChangedFiles(context)).resolves.toEqual(pullRequestFiles);
    expect(compareCommits).toHaveBeenCalledTimes(1);
    expect(compareCommits).toHaveBeenCalledWith({
      owner: 'owner',
      repo: 'repo',
      base: 'reviewed-head',
      head: 'current-head',
    });
  });

  test('paginates pull request reviews before selecting the latest one', async () => {
    const { context, listReviews, paginate } = createContext({
      reviews: [createBotReview()],
      comparisons: [
        {
          status: 'ahead',
          files: incrementalFiles,
        },
      ],
    });

    await getChangedFiles(context);

    expect(paginate).toHaveBeenCalledWith(listReviews, {
      owner: 'owner',
      repo: 'repo',
      pull_number: 123,
      per_page: 100,
    });
  });
});

describe('getReviewCommentLocation', () => {
  test('uses the last right-side line for a multi-line hunk', () => {
    expect(getReviewCommentLocation('@@ -10,5 +10,7 @@')).toEqual({
      line: 16,
      side: 'RIGHT',
    });
  });

  test('defaults omitted hunk counts to one line', () => {
    expect(getReviewCommentLocation('@@ -10 +12 @@ function name')).toEqual({
      line: 12,
      side: 'RIGHT',
    });
  });

  test('uses the left side for a deletion-only hunk', () => {
    expect(getReviewCommentLocation('@@ -10,3 +10,0 @@')).toEqual({
      line: 12,
      side: 'LEFT',
    });
  });

  test('rejects malformed hunk headers', () => {
    expect(getReviewCommentLocation('not a hunk header')).toBeNull();
  });

  test('rejects a missing hunk header', () => {
    expect(getReviewCommentLocation()).toBeNull();
  });
});

describe('isHunkHeaderInPatch', () => {
  test('accepts a hunk range present in the current patch', () => {
    expect(
      isHunkHeaderInPatch('@@ -10,2 +10,3 @@ function example() {', patch)
    ).toBe(true);
  });

  test('normalizes omitted single-line counts', () => {
    expect(
      isHunkHeaderInPatch('@@ -30 +30 @@', '@@ -30,1 +30,1 @@')
    ).toBe(true);
  });

  test('rejects a valid hunk range absent from the current patch', () => {
    expect(isHunkHeaderInPatch('@@ -100,2 +100,3 @@', patch)).toBe(false);
  });

  test('does not treat a context line as a hunk header', () => {
    expect(
      isHunkHeaderInPatch(
        '@@ -100,2 +100,3 @@',
        ' @@ -100,2 +100,3 @@ example text'
      )
    ).toBe(false);
  });

  test('rejects a malformed hunk header', () => {
    expect(isHunkHeaderInPatch('not a hunk header', patch)).toBe(false);
  });
});

describe('createInlineReviewComment', () => {
  test('creates a right-side comment for a hunk in the current patch', () => {
    expect(
      createInlineReviewComment(
        'src/file.ts',
        'Finding',
        '@@ -10,2 +10,3 @@ function example() {',
        patch
      )
    ).toEqual({
      path: 'src/file.ts',
      body: 'Finding',
      line: 12,
      side: 'RIGHT',
    });
  });

  test('creates a left-side comment for a deletion hunk in the patch', () => {
    expect(
      createInlineReviewComment(
        'src/file.ts',
        'Finding',
        '@@ -20,3 +21,0 @@ function removed() {',
        patch
      )
    ).toEqual({
      path: 'src/file.ts',
      body: 'Finding',
      line: 22,
      side: 'LEFT',
    });
  });

  test('rejects a hallucinated hunk range', () => {
    expect(
      createInlineReviewComment(
        'src/file.ts',
        'Finding',
        '@@ -100,2 +100,3 @@',
        patch
      )
    ).toBeNull();
  });

  test('rejects a missing hunk header', () => {
    expect(
      createInlineReviewComment('src/file.ts', 'Finding', undefined, patch)
    ).toBeNull();
  });
});

describe('createReviewBody', () => {
  test('marks a review with inline comments as a ChatGPT review', () => {
    expect(createReviewBody(true, [])).toBe(
      'Code review by ChatGPT\n\n<!-- chatgpt-code-review -->'
    );
  });

  test('keeps unpositioned findings in the review body', () => {
    expect(createReviewBody(false, ['**File:** `src/file.ts`\n\nFinding'])).toBe(
      'Code review by ChatGPT\n\n**File:** `src/file.ts`\n\nFinding\n\n<!-- chatgpt-code-review -->'
    );
  });

  test('marks a review with no findings as LGTM', () => {
    expect(createReviewBody(false, [])).toBe(
      'LGTM 👍\n\n<!-- chatgpt-code-review -->'
    );
  });
});

describe('robot', () => {
  const githubActions = process.env.GITHUB_ACTIONS;

  afterEach(() => {
    if (githubActions === undefined) {
      delete process.env.GITHUB_ACTIONS;
    } else {
      process.env.GITHUB_ACTIONS = githubActions;
    }
    process.exitCode = undefined;
  });

  test('marks the GitHub Action as failed when a webhook handler fails', () => {
    process.env.GITHUB_ACTIONS = 'true';
    const app = {
      on: jest.fn(),
      onError: jest.fn(),
    };

    robot(app as any);

    expect(app.onError).toHaveBeenCalledTimes(1);
    const errorHandler = app.onError.mock.calls[0][0];
    errorHandler();
    expect(process.exitCode).toBe(1);
  });

  test('does not change process error handling outside GitHub Actions', () => {
    delete process.env.GITHUB_ACTIONS;
    const app = {
      on: jest.fn(),
      onError: jest.fn(),
    };

    robot(app as any);

    expect(app.onError).not.toHaveBeenCalled();
    expect(process.exitCode).toBeUndefined();
  });
});

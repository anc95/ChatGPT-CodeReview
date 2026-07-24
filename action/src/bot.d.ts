import { Context, Probot } from 'probot';
type PullRequestContext = Context<'pull_request.opened' | 'pull_request.synchronize'>;
export declare const getReviewCommentLocation: (hunkHeader?: string) => {
    line: number;
    side: "RIGHT";
} | {
    line: number;
    side: "LEFT";
} | null;
export declare const isHunkHeaderInPatch: (hunkHeader: string | undefined, patch: string) => boolean;
export declare const createInlineReviewComment: (path: string, body: string, hunkHeader: string | undefined, patch: string) => {
    path: string;
    body: string;
    line: number;
    side: "RIGHT" | "LEFT";
} | null;
export declare const createReviewBody: (hasInlineComments: boolean, bodyComments: string[]) => string;
export declare const getChangedFiles: (context: PullRequestContext) => Promise<{
    sha: string;
    filename: string;
    status: "added" | "removed" | "modified" | "renamed" | "copied" | "changed" | "unchanged";
    additions: number;
    deletions: number;
    changes: number;
    blob_url: string;
    raw_url: string;
    contents_url: string;
    patch?: string | undefined;
    previous_filename?: string | undefined;
}[]>;
export declare const robot: (app: Probot) => void;
export {};

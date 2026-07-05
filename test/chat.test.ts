import { Chat } from "../src/chat";

jest.mock("openai", () => {
  const mockCreate = jest.fn();
  return {
    OpenAI: jest.fn().mockImplementation(() => ({
      chat: { completions: { create: mockCreate } },
    })),
    mockCreate,
  };
});

const { OpenAI, mockCreate } = require("openai");

describe("Chat", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    mockCreate.mockReset();
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: '{"lgtm": true, "review_comment": ""}' } }],
    });
    (OpenAI as jest.Mock).mockClear();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  test("passes model from MODEL env var", async () => {
    process.env.MODEL = "gpt-5.4";

    const chat = new Chat("test-key");
    await chat.codeReview("@@ -1,3 +1,4 @@\n+new line\n old line");

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ model: "gpt-5.4" })
    );
  });

  test("defaults to gpt-4o-mini when MODEL is not set", async () => {
    delete process.env.MODEL;

    const chat = new Chat("test-key");
    await chat.codeReview("@@ -1,3 +1,4 @@\n+new line\n old line");

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ model: "gpt-4o-mini" })
    );
  });

  test("passes reasoning_effort when REASONING_EFFORT is set", async () => {
    process.env.MODEL = "o3-mini";
    process.env.REASONING_EFFORT = "low";

    const chat = new Chat("test-key");
    await chat.codeReview("@@ -1,3 +1,4 @@\n+new line\n old line");

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ reasoning_effort: "low" })
    );
  });

  test("passes reasoning_effort for the o1 reasoning model", async () => {
    process.env.MODEL = "o1";
    process.env.REASONING_EFFORT = "medium";

    const chat = new Chat("test-key");
    await chat.codeReview("@@ -1,3 +1,4 @@\n+new line\n old line");

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ reasoning_effort: "medium" })
    );
  });

  test("passes reasoning_effort for the o1-mini reasoning model", async () => {
    process.env.MODEL = "o1-mini";
    process.env.REASONING_EFFORT = "medium";

    const chat = new Chat("test-key");
    await chat.codeReview("@@ -1,3 +1,4 @@\n+new line\n old line");

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ reasoning_effort: "medium" })
    );
  });

  test("passes reasoning_effort for provider-prefixed reasoning models", async () => {
    process.env.USE_GITHUB_MODELS = "true";
    process.env.MODEL = "openai/o3-mini";
    process.env.REASONING_EFFORT = "medium";

    const chat = new Chat("test-key");
    await chat.codeReview("@@ -1,3 +1,4 @@\n+new line\n old line");

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        model: "openai/o3-mini",
        reasoning_effort: "medium",
      })
    );
  });

  test("detects provider-prefixed reasoning models case-insensitively", async () => {
    process.env.USE_GITHUB_MODELS = "true";
    process.env.MODEL = "OpenAI/O3-MINI";
    process.env.REASONING_EFFORT = "high";

    const chat = new Chat("test-key");
    await chat.codeReview("@@ -1,3 +1,4 @@\n+new line\n old line");

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        model: "OpenAI/O3-MINI",
        reasoning_effort: "high",
      })
    );
  });

  test.each(["none", "minimal", "xhigh"])(
    "passes SDK-supported reasoning_effort value %s",
    async (reasoningEffort) => {
      process.env.MODEL = "gpt-5.5";
      process.env.REASONING_EFFORT = reasoningEffort;

      const chat = new Chat("test-key");
      await chat.codeReview("@@ -1,3 +1,4 @@\n+new line\n old line");

      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({ reasoning_effort: reasoningEffort })
      );
    }
  );

  test("does not pass reasoning_effort when REASONING_EFFORT is not set", async () => {
    process.env.MODEL = "gpt-4o";
    delete process.env.REASONING_EFFORT;

    const chat = new Chat("test-key");
    await chat.codeReview("@@ -1,3 +1,4 @@\n+new line\n old line");

    const callArgs = mockCreate.mock.calls[0][0];
    expect(callArgs.reasoning_effort).toBeUndefined();
  });

  test("does not pass reasoning_effort when model is not a reasoning model", async () => {
    process.env.MODEL = "gpt-4o";
    process.env.REASONING_EFFORT = "high";

    const chat = new Chat("test-key");
    await chat.codeReview("@@ -1,3 +1,4 @@\n+new line\n old line");

    const callArgs = mockCreate.mock.calls[0][0];
    expect(callArgs.reasoning_effort).toBeUndefined();
  });

  test("does not treat every o-prefixed model as a reasoning model", async () => {
    process.env.MODEL = "orca-2";
    process.env.REASONING_EFFORT = "high";
    process.env.temperature = "0.5";
    process.env.top_p = "0.9";

    const chat = new Chat("test-key");
    await chat.codeReview("@@ -1,3 +1,4 @@\n+new line\n old line");

    const callArgs = mockCreate.mock.calls[0][0];
    expect(callArgs.reasoning_effort).toBeUndefined();
    expect(callArgs.temperature).toBe(0.5);
    expect(callArgs.top_p).toBe(0.9);
    expect(callArgs.response_format).toEqual({ type: "json_object" });
  });

  test.each(["o1-preview"])(
    "does not pass reasoning_effort for %s",
    async (model) => {
      process.env.MODEL = model;
      process.env.REASONING_EFFORT = "high";
      process.env.temperature = "0.5";
      process.env.top_p = "0.9";

      const chat = new Chat("test-key");
      await chat.codeReview("@@ -1,3 +1,4 @@\n+new line\n old line");

      const callArgs = mockCreate.mock.calls[0][0];
      expect(callArgs.reasoning_effort).toBeUndefined();
      expect(callArgs.temperature).toBe(0.5);
      expect(callArgs.top_p).toBe(0.9);
      expect(callArgs.response_format).toEqual({ type: "json_object" });
    }
  );

  test("omits temperature and top_p for reasoning models", async () => {
    process.env.MODEL = "gpt-5.4";
    process.env.temperature = "0.5";
    process.env.top_p = "0.9";

    const chat = new Chat("test-key");
    await chat.codeReview("@@ -1,3 +1,4 @@\n+new line\n old line");

    const callArgs = mockCreate.mock.calls[0][0];
    expect(callArgs.temperature).toBeUndefined();
    expect(callArgs.top_p).toBeUndefined();
    expect(callArgs.response_format).toEqual({ type: "json_object" });
  });

  test("includes temperature, top_p, and response_format for non-reasoning models", async () => {
    process.env.MODEL = "gpt-4o";
    process.env.temperature = "0.5";
    process.env.top_p = "0.9";

    const chat = new Chat("test-key");
    await chat.codeReview("@@ -1,3 +1,4 @@\n+new line\n old line");

    const callArgs = mockCreate.mock.calls[0][0];
    expect(callArgs.temperature).toBe(0.5);
    expect(callArgs.top_p).toBe(0.9);
    expect(callArgs.response_format).toEqual({ type: "json_object" });
  });

  test("returns empty review for empty patch", async () => {
    const chat = new Chat("test-key");
    const result = await chat.codeReview("");
    expect(result).toEqual({ lgtm: true, review_comment: "" });
    expect(mockCreate).not.toHaveBeenCalled();
  });

  test("uses GitHub Models endpoint when USE_GITHUB_MODELS is true", async () => {
    process.env.USE_GITHUB_MODELS = "true";
    process.env.MODEL = "openai/gpt-4o";

    new Chat("test-key");

    expect(OpenAI).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: "https://models.github.ai/inference",
      })
    );
  });

  test("uses custom endpoint when OPENAI_API_ENDPOINT is set", async () => {
    process.env.OPENAI_API_ENDPOINT = "https://custom.api.com/v1";

    new Chat("test-key");

    expect(OpenAI).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: "https://custom.api.com/v1",
      })
    );
  });
});

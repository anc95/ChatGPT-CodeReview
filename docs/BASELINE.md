# 基线记录（Baseline）

> 模块：基线与工程环境 · 任务 1
> 记录日期：2026-10-28
> 记录人：待填（组内认领本模块的成员）

## 1. 固定 commit

| 项 | 值 |
| --- | --- |
| 基线 commit（TECH_SPEC 固定） | `8bd66227f057f21e847a8c27c9b356c25271d292` |
| 当前 main 分支 HEAD | `fad72c5229ccef11448c3077a617fb7b2bdd934a` |

> main 比基线多出 docs 更新（TODO.md / TECH_SPEC.md），`src/` 代码与基线一致。

## 2. 环境

| 项 | 值 |
| --- | --- |
| 操作系统 | macOS（Darwin 22.1.0） |
| Node.js | v24.14.1（满足 TECH_SPEC 要求的 Node 24） |
| npm | 11.11.0 |

## 3. 依赖

- 包管理：npm（项目同时含 `package-lock.json` 和 `yarn.lock`，以 npm 为准）
- 依赖总数：652 个包（`npm install` 结果）
- 已知漏洞：62 个（15 low / 22 moderate / 20 high / 5 critical），来自上游遗留（probot 12、next 13），暂不处理

## 4. 有效模型参数

来源：`src/chat.ts` 与 `.env.example`。

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `MODEL` | `gpt-4o-mini`（GitHub Models 下为 `openai/gpt-4o-mini`） | 模型名 |
| `temperature` | `1` | 仅非 reasoning 模型 |
| `top_p` | `1` | 仅非 reasoning 模型 |
| `max_tokens` | 未设置 | |
| `response_format` | `json_object` | 固定 |
| `REASONING_EFFORT` | 未设置 | 仅 reasoning 模型 |
| `LANGUAGE` | 未设置（默认英文） | 审查语言 |
| `PROMPT` | `Below there is a code diff please help me do a code review` | 默认 prompt |

## 5. 命令执行结果

| 命令 | 结果 | 说明 |
| --- | --- | --- |
| `npm ci` | ❌ 失败 | lock 与 package.json 不同步，缺 esbuild 各平台可选依赖 |
| `npm install` | ✅ 成功 | 652 包；已修改本地 `package-lock.json` |
| `npm test` | ✅ 52/52 通过 | 2 个测试套件 |
| `npm run build` | ✅ 成功 | 生成 `dist/` 与 `action/index.cjs`（约 6.5MB） |

## 6. 原版 PR 审查

- [ ] 待做：需要 `OPENAI_API_KEY`（或 GitHub Models token），真实跑一次 PR 审查并保存输出作为基线参考。

## 7. 待解决事项

- [ ] `npm ci` 需修复 lock 文件（缺少 esbuild 可选依赖），或团队约定改用 `npm install`
- [ ] 原版 PR 审查需 API key

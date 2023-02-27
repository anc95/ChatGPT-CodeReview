# 代碼審查機器人

> 由 ChatGPT 提供支持的代碼審查機器人

翻譯版本：[英語](./README.md)\|[中文簡體](./README.zh-CN.md)\|[中文繁體](./README.zh-TW.md)

## 用法

### 安裝

安裝：[apps/cr-gpt](https://github.com/apps/cr-gpt);

### 配置

1.  轉到你要集成此機器人的倉庫首頁
2.  點擊`settings`
3.  點擊`actions`在下面`secrets and variables`
4.  切換到`Variables`選項，創建一個新變量`OPENAI_API_KEY`，值為你的open api 的key<img width="1465" alt="image" src="https://user-images.githubusercontent.com/13167934/218533628-3974b70f-c423-44b0-b096-d1ec2ace85ea.png">

### 開始使用

1.  當你創建一個新的 Pull request 時，機器人會自動進行代碼審查，審查信息將顯示在 pr timeline / file changes 部分。
2.  在`git push`更新PR之後，cr bot 將重新審查更改的文件

例子：

[ChatGPT-CodeReview/pull/21](https://github.com/anc95/ChatGPT-CodeReview/pull/21)

<img width="1052" alt="image" src="https://user-images.githubusercontent.com/13167934/218999459-812206e1-d8d2-4900-8ce8-19b5b6e1f5cb.png">

### 使用 Github Action

> 這是推薦的方式，因為 github bot 在一個不起眼的 vps 上服務，我不能確保它總是穩定的

[actions/chatgpt-codereviewer](https://github.com/marketplace/actions/chatgpt-codereviewer)

1.  添加`OPEN_API_KEY`到你的 github action 密鑰
2.  創建`.github/workflows/cr.yml`添加以下內容

```yml
name: Code Review

permissions:
  contents: read
  pull-requests: write

on:
  pull_request:
    types: [opened, reopened]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: anc95/ChatGPT-CodeReview@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

## 自托管

1.  克隆代碼
2.  復製`.env.example`到`.env`, 並填寫環境變量
3.  安裝deps並運行

```sh
npm i
npm -i g pm2
npm run build
pm2 start pm2.config.cjs
```

[機器人](https://probot.github.io/docs/development/)了解更多詳情

## 開發

### 設置

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

### Docker

```sh
# 1. Build container
docker build -t cr-bot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> cr-bot
```

## 貢獻

如果您對如何改進 cr-bot 有建議，或者想報告錯誤，請打開一個問題！我們會喜歡所有的貢獻。

有關更多信息，請查看[投稿指南](CONTRIBUTING.md).

## 靈感

這個項目的靈感來自[代碼審查.gpt](https://github.com/sturdy-dev/codereview.gpt)

## License

[ISC](LICENSE)© 2023 anc95

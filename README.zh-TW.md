# 代碼審查機器人

> 由 ChatGPT 提供支持的代碼審查機器人

文檔：[在](./README.md)\|[J-KN](./README.zh-CN.md)\|[Zh-TV](./README.zh-TW.md)

## 用法

### 安裝

安裝：<https://github.com/apps/cr-gpt>;

### 配置

1.  前往<repo>你想整合這個機器人
2.  點擊`settings`
3.  點擊`actions`在下面`secrets and variables`
4.  改成`Variables` tab, create a new variable `OPENAI_API_KEY`使用您打開的 api 密鑰的值<img width="1465" alt="image" src="https://user-images.githubusercontent.com/13167934/218533628-3974b70f-c423-44b0-b096-d1ec2ace85ea.png">

### 開始使用

1.  當您創建一個新的 Pull request 時，機器人會自動進行代碼審查，審查信息將顯示在 pr timeline / file changes 部分。
2.  後`git push`更新拉取請求，cr bot 將重新審查更改的文件

例子：

<https://github.com/anc95/ChatGPT-CodeReview/pull/21>

<img width="1052" alt="image" src="https://user-images.githubusercontent.com/13167934/218999459-812206e1-d8d2-4900-8ce8-19b5b6e1f5cb.png">

### 使用 Github 動作

> 這是推薦的方式，因為 github bot 在一個不起眼的 vps 上服務，我不能確保它總是穩定的

<https://github.com/marketplace/actions/chatgpt-codereviewer>

1.  添加`OPEN_API_KEY`到你的 github 操作秘密
2.  創造`.github/workflow/cr.yml`添加以下內容

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

## 自託管

1.  克隆代碼

2.

```sh
npm i
npm -i g pm2
npm run build
pm2 start pm2.config.cjs
```

## 開發

### 設置

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

### 碼頭工人

```sh
# 1. Build container
docker build -t cr-bot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> cr-bot
```

## 貢獻

如果您對如何改進 cr-bot 有建議，或者想報告錯誤，請打開一個問題！我們會喜歡所有的貢獻。

有關更多信息，請查看[投稿指南](CONTRIBUTING.md).

## 信用

這個項目的靈感來自[代碼審查.gpt](https://github.com/sturdy-dev/codereview.gpt)

## 執照

[國際學習中心](LICENSE)© 2023 anc95

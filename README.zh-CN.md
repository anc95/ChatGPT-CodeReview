# 代码审查机器人

> 由 ChatGPT 提供支持的代码审查机器人

翻译版本：[英语](./README.md)\|[中文简体](./README.zh-CN.md)\|[中文繁体](./README.zh-TW.md)

## 用法

### 安装

安装：[应用程序/cr-gpt](https://github.com/apps/cr-gpt);

### 配置

1.  转到要集成此机器人的回购主页
2.  点击`settings`
3.  点击`actions`在下面`secrets and variables`
4.  改成`Variables`选项卡，创建一个新变量`OPENAI_API_KEY`使用您打开的 api 密钥的值<img width="1465" alt="image" src="https://user-images.githubusercontent.com/13167934/218533628-3974b70f-c423-44b0-b096-d1ec2ace85ea.png">

### 开始使用

1.  当您创建一个新的 Pull request 时，机器人会自动进行代码审查，审查信息将显示在 pr timeline / file changes 部分。
2.  后`git push`更新拉取请求，cr bot 将重新审查更改的文件

例子：

[ChatGPT-CodeReview/拉/21](https://github.com/anc95/ChatGPT-CodeReview/pull/21)

<img width="1052" alt="image" src="https://user-images.githubusercontent.com/13167934/218999459-812206e1-d8d2-4900-8ce8-19b5b6e1f5cb.png">

### 使用 Github 操作

> 这是推荐的方式，因为 github bot 在一个不起眼的 vps 上服务，我不能确保它总是稳定的

[动作/chatgpt-codereviewer](https://github.com/marketplace/actions/chatgpt-codereviewer)

1.  添加`OPEN_API_KEY`到你的 github 操作秘密
2.  创造`.github/workflow/cr.yml`添加以下内容

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

1.  克隆代码
2.  复制`.env.example`到`.env`, 并填写环境变量
3.  安装deps并运行

```sh
npm i
npm -i g pm2
npm run build
pm2 start pm2.config.cjs
```

[机器人](https://probot.github.io/docs/development/)了解更多详情

## 开发

### 设置

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

### 码头工人

```sh
# 1. Build container
docker build -t cr-bot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> cr-bot
```

## 贡献

如果您对如何改进 cr-bot 有建议，或者想报告错误，请打开一个问题！我们会喜欢所有的贡献。

有关更多信息，请查看[投稿指南](CONTRIBUTING.md).

## 信用

这个项目的灵感来自[代码审查.gpt](https://github.com/sturdy-dev/codereview.gpt)

## 执照

[国际学习中心](LICENSE)© 2023 anc95

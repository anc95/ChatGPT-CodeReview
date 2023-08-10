# CodeReview BOT

> A code review robot powered by ChatGPT

Translation Versions: [ENGLISH](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-TW.md) | [한국어](./README.ko.md) | [日本語](./README.ja.md)

## Usage

❗️⚠️ コストを考慮して BOT はテスト目的でのみ使用され、現在 AWS Lambda に展開されて速度制限を受けています。そのため、不安定な状況は完全に正常です。アプリケーションを直接展開することをお勧めします。

## Install

Install: [apps/cr-gpt](https://github.com/apps/cr-gpt);

### Configuration

1. リポジトリのホームページに移動します
2. `settings` をクリックします
3. `secrets and variables` メニューの下の `actions` をクリックします
4. `New repository variable` をクリックして OpenAI の API キーの登録を行います。変数名は `OPENAI_API_KEY` にしてください。変数の値には OpenAI の API キーを入力します。 (OpenAI のホームページから API キーを取得できます。)
   <img width="1465" alt="image" src="https://user-images.githubusercontent.com/13167934/218533628-3974b70f-c423-44b0-b096-d1ec2ace85ea.png">

### Start using

1. この bot は新しいプルリクエストが作成されたときに自動的にコードレビューを行います。レビュー結果はプルリクエストのタイムラインやファイル変更部分に表示されます。
2. `git push` によりプルリクエストの更新が行われたときにも自動的にコードレビューを行います。

example:

[ChatGPT-CodeReview/pull/21](https://github.com/anc95/ChatGPT-CodeReview/pull/21)

<img width="1052" alt="image" src="https://user-images.githubusercontent.com/13167934/218999459-812206e1-d8d2-4900-8ce8-19b5b6e1f5cb.png">

### Using Github Actions

> 基本的には、Github Actions での利用を推奨します。

[actions/chatgpt-codereviewer](https://github.com/marketplace/actions/chatgpt-codereviewer)

1. `OPENAI_API_KEY` を設定する
2. 以下の例のように `.github/workflows/cr.yml` を作成する

```yml
name: Code Review

permissions:
  contents: read
  pull-requests: write

on:
  pull_request:
    types: [opened, reopened, synchronize]

jobs:
  test:
    if: ${{ contains(github.event.*.labels.*.name, 'gpt review') }} # Optional; to run only when a label is attached
    runs-on: ubuntu-latest
    steps:
      - uses: anc95/ChatGPT-CodeReview@main
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          # Optional
          LANGUAGE: Chinese
          MODEL:
          PROMPT:
          top_p: 1
          temperature: 1
```

## Self-hosting

1. このリポジトリをクローンします
2. `.env.example` を `.env` にリネームし、必要な環境変数を設定します
3. 以下のコマンドを順番に実行することで依存関係をインストールし、bot を起動します

```sh
npm i
npm -i g pm2
npm run build
pm2 start pm2.config.cjs
```

詳細は [probot](https://probot.github.io/docs/development/) を参照してください。

## Dev

### Setup

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

## Contributing

cr-bot の改善に関する提案やバグ報告は、issue を作成してください。どのような貢献でも歓迎します！！

より詳しい情報は [Contributing Guide](CONTRIBUTING.md) を参照してください。

## Credit

this project is inpired by [codereview.gpt](https://github.com/sturdy-dev/codereview.gpt)

## License

[ISC](LICENSE) © 2023 anc95

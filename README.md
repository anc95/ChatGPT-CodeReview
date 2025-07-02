# CodeReview BOT

> A code review robot powered by Groq's Compound Beta model

Translation Versions: [ENGLISH](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-TW.md) | [한국어](./README.ko.md) | [日本語](./README.ja.md)

## Bot Usage

❗️⚠️ `Due to cost considerations, BOT is only used for testing purposes and is currently deployed on AWS Lambda with ratelimit restrictions. Therefore, unstable situations are completely normal. It is recommended to deploy an app by yourself.`

### Install

Install: [apps/cr-gpt](https://github.com/apps/cr-gpt);

### Configuration

1. Go to the repo homepage which you want integrate this bot
2. click `settings`
3. click `actions` under `secrets and variables`
4. Change to `Variables` tab, create a new variable `GROQ_API_KEY` with the value of your Groq API key (For Github Action integration, set it in secrets)
   <img width="1465" alt="image" src="https://user-images.githubusercontent.com/13167934/218533628-3974b70f-c423-44b0-b096-d1ec2ace85ea.png">

### Start using

1. The robot will automatically do the code review when you create a new Pull request, the review information will show in the pr timeline / file changes part.
2. After `git push` update the pull request, cr bot will re-review the changed files

example:

[ChatGPT-CodeReview/pull/21](https://github.com/anc95/ChatGPT-CodeReview/pull/21)

<img width="1052" alt="image" src="https://user-images.githubusercontent.com/13167934/218999459-812206e1-d8d2-4900-8ce8-19b5b6e1f5cb.png">

## Using Github Actions

[actions/chatgpt-codereviewer](https://github.com/marketplace/actions/chatgpt-codereviewer)

1. add the `GROQ_API_KEY` to your github actions secrets
2. create `.github/workflows/cr.yml` add bellow content

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
    # if: ${{ contains(github.event.*.labels.*.name, 'gpt review') }} # Optional; to run only when a label is attached
    runs-on: ubuntu-latest
    steps:
      - uses: aj-groq/Compound-Reviewer@main
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GROQ_API_KEY: ${{ secrets.GROQ_API_KEY }}
          # Optional
          LANGUAGE: Chinese
          GROQ_API_ENDPOINT: https://api.groq.com/openai/v1
          GROQ_MODEL: compound-beta # Default is 'compound-beta', can be changed to any available Groq model
          PROMPT: # example: Please check if there are any confusions or irregularities in the following code diff:
          top_p: 1
          temperature: 1
          max_tokens: 10000
          MAX_PATCH_LENGTH: 10000
          IGNORE_PATTERNS: /node_modules/**/*,*.md
          INCLUDE_PATTERNS: *.js,*.ts

```

## Self-hosting

1. clone code
2. copy `.env.example` to `.env`, and fill the env variables
3. install deps and run

```sh
npm i
npm i -g pm2
npm run build
pm2 start pm2.config.cjs
```

**Note:** This bot is now powered by Groq and uses the `compound-beta` model by default.

[probot](https://probot.github.io/docs/development/) for more detail

## Dev

### Setup

```sh
# Install dependencies
npm install

# Build code
npm run build

# Run the bot
npm run start
```

### Docker

```sh
# 1. Build container
docker build -t cr-bot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> cr-bot
```

## Contributing

If you have suggestions for how cr-bot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## Credit

this project is inpired by [codereview.gpt](https://github.com/sturdy-dev/codereview.gpt)

## License

[ISC](LICENSE) © 2023 anc95

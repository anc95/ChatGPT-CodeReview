# CodeReview BOT

> A code review robot powered by ChatGPT

## Usage

### Install

Install: https://github.com/apps/cr-bot;

### Configuration

1. Go to the <repo> you want integrate this bot
2. click `settings`
3. click `actions` under `secrets and variables`
4. Change to `Variables` tab, create a new variable `OPENAI_API_KEY` with the value of your open api key
<img width="1465" alt="image" src="https://user-images.githubusercontent.com/13167934/218533628-3974b70f-c423-44b0-b096-d1ec2ace85ea.png">

### Start using

1. The robot will automatically do the code review when you create a new Pull request.
2. Meanwhile, you can always trigger the code review manually by comment with `/cr-gpt`

example:

<img width="1024" alt="image" src="https://user-images.githubusercontent.com/13167934/218536087-9c951161-88ca-42b4-8cef-0cc1cd62eff2.png">

2. Meanwhile, you can always trigger the code review manually by comment with `/cr-gpt`

## Self-hosting
I am using the vercel to host this service, it's a hobby account, so there is much limitation for using, you can use the code to deploy one yourself on vercel, and config the webhook

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/anc95/ChatGPT-CodeReview)

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

If you have suggestions for how cr-bot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## Credit
this project is inpired by [codereview.gpt](https://github.com/sturdy-dev/codereview.gpt)

## License

[ISC](LICENSE) © 2023 anc95

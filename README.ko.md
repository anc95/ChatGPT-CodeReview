# CodeReview BOT

> cr bot은 ChatGPT를 활용한 코드리뷰 로봇입니다.

Translation Versions: [ENGLISH](./README.md) | [中文简体](./README.zh-CN.md) | [中文繁體](./README.zh-TW.md) | [한국어](./README.ko.md)

## 사용법

### 설치

설치: [apps/cr-gpt](https://github.com/apps/cr-gpt);

### 설정

1. cr bot을 적용할 레포지토리 홈페이지로 이동합니다.
2. `settings` 클릭
3. `secrets and variables` 메뉴 밑의 `actions` 를 클릭
4. `Variables` 탭으로 변경합니다, `New repository variable` 버튼을 눌러서 새로운 `OPENAI_API_KEY` 변수를 생성합니다. 변수의 값으로 당신의 open api key 를 입력합니다. (OpenAI 홈페이지에서 api 키를 받을 수 있습니다.)
   <img width="1465" alt="image" src="https://user-images.githubusercontent.com/13167934/218533628-3974b70f-c423-44b0-b096-d1ec2ace85ea.png">

### 사용 시작하기

1. 새로운 Pull request를 생성하면 로봇이 자동으로 코드 리뷰를 수행하며, 리뷰 정보는 Pull request 타임라인 / 파일 변경 부분에 표시됩니다.
2. `git push` 이후에 Pull request를 업데이트하면, cr bot은 변경된 파일을 다시 검토합니다.

예시:

[ChatGPT-CodeReview/pull/21](https://github.com/anc95/ChatGPT-CodeReview/pull/21)

<img width="1052" alt="image" src="https://user-images.githubusercontent.com/13167934/218999459-812206e1-d8d2-4900-8ce8-19b5b6e1f5cb.png">

### Github Actions 사용하기

> 깃허브 봇이 humble vps에서 서비스되므로, 항상 안정적인 상태임을 보장할 수 없기 때문에 이 방법을 권장합니다.

[actions/chatgpt-codereviewer](https://github.com/marketplace/actions/chatgpt-codereviewer)

1. `OPEN_API_KEY` 를 당신의 github actions secrets 에 추가합니다.
2. `.github/workflows/cr.yml` 를 생성하고, 아래의 내용을 추가합니다.

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
          LANGUAGE: Chinese
```

## Self-hosting

1. 코드를 clone 합니다.
2. `.env.example` 을 `.env`로 복제하고, 환경변수(env variable)을 입력합니다.
3. 종속성(deps)들을 설치하고 실행합니다.

```sh
npm i
npm -i g pm2
npm run build
pm2 start pm2.config.cjs
```

[probot](https://probot.github.io/docs/development/) 더 자세한 정보

## Dev

### 설정

```sh
# 종속성 설치
npm install

# 봇 실행
npm start
```

### Docker

```sh
# 1. 컨테이너 빌드
docker build -t cr-bot .

# 2. 컨테이너 시작
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> cr-bot
```

## 기여하기

만약 당신이 cr-bot의 개선 제안이나 버그 신고가 있으면 issue를 열어주세요! 모든 당신의 기여를 환영합니다.

자세한 내용은 [기여 가이드](CONTRIBUTING.md)를 확인하세요.

## Credit

이 프로젝트는 [codereview.gpt](https://github.com/sturdy-dev/codereview.gpt)에서 영감을 얻었습니다.

## License

[ISC](LICENSE) © 2023 anc95

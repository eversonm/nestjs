<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

![](./swagger-crud.png)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript repository.

## Installation

```bash
$ npm install
```

## Before running the app
Create a <b>.env</b> file with your MySQL config and Ethereal Email data:
<pre>DATABASE_URL="mysql://root:MySql2023@localhost:3306/testedb"
JWT_KEY="YOUR_SECRET_KEY_HERE_123456789101112"
ETHEREAL_EMAIL_HOST="smtp.ethereal.email"
ETHEREAL_EMAIL_USER="SOME_USER@ethereal.email"
ETHEREAL_EMAIL_PASS="SOME_PASSWORD"
</pre>
And then:
```bash
# init mysql docker container and execute in background
$ docker compose up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run prod
```

## Test

```bash
# unit tests
$ npm run test

# specific test example
$ npm run test -t src/user/user.service.spec.ts
# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger Docs

[http://localhost:3000/api](http://localhost:3000/api)

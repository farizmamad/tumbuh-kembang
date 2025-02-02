<h1 align="center"> Tumbuh Kembang </h1>
<p align="center">
  An open source backend application for parents tracking their children development. Built on top of TypeScript, NestJS framework, and PostgreSQL. Empowered by Google Cloud Platform DevOps.
</p>
<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png" width="100" alt="TypeScript" />
  <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS" />
  <img src="https://hub.docker.com/api/media/repos_logo/v1/library%2Fpostgres" width="100" alt="PostgreSQL" />
  <img src="https://static-00.iconduck.com/assets.00/google-cloud-icon-512x412-8rnz6wkz.png" width="100" alt="Google Cloud" />
</p>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Tumbuh Kembang is an MIT-licensed open source project. To support this project, please give a star and share to whom it may concern.

## Stay in touch

1. Author - [Ahmad Fariz](https://www.lassodev.com)

## License

Tumbuh Kembang is [MIT licensed](LICENSE).

## API Routes
1. Register
2. Login
3. Get my children summary
4. Get my children list
5. add a new child
6. update a child
7. delete a child and all of the developments
8. Get details of a child 
9. add a new development of a child
10. update a development of a child
11. delete a development of a child

## Entities
1. User
- username: string
- password: string
- display_name: string
- created_at: Date
- updated_at: Date

2. Child
- display_name: string
- dob: Date

3. Development
- checkpoint_at: Date
- weight_kg: number
- height_cm: number
- development: string[]
- created_at: Date
- updated_at: Date

## Entity Relationship Diagram
- User - Child: 1 to many
- Child - Development: 1 to many

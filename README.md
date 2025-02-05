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

# Development and Testing
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

# Build and Deploy to local using Docker Compose
```bash
$ npm run compose
```

# Build and Deploy to GCP Cloud Run using GCP Cloud Build from GitHub Actions
1. commit any changes
2. if the change is in 'main' branch, push the change to GitHub.
3. If the change is in other branches, pull request to 'main' branch.
4. Then wait for the github actions to deploy the app.

# Build and Deploy to GCP Cloud Run using GCP Cloud Build from local
1. Set up Cloud Build in your GCP project. See [this tutorial](https://cloud.google.com/build/docs/set-up).
2. Set GCP environment variables
```bash
$ export GCP_PROJECT_ID=YOUR_PROJECT_ID
$ export GCP_REGION=THE_REGION
```

example:
```bash
$ export GCP_PROJECT_ID=YOUR_PROJECT_ID
$ export GCP_REGION=asia-southeast2
```
3. Build/Deploy the containerized application to cloud run 
```bash
$ npm run cloudbuild:build
```
or
```bash
$ npm run cloudbuild:deploy
```

# Others

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
10. get all developments of a child
11. update a development of a child
12. delete a development of a child

## Entities
1. User
- id: string
- username: string
- password: string
- display_name: string
- created_at: Date
- updated_at: Date
- children: Child[]

2. Child
- id: string
- display_name: string
- dob: Date
- parent: User
- developments: Development[]

3. Development
- id: string
- checkpoint_at: Date
- weight_kg: number
- height_cm: number
- development: string[]
- created_at: Date
- updated_at: Date
- child: Child

## Entity Relationship Diagram
- User - Child: 1 to many
- Child - Development: 1 to many
- User - Development: 1 to many

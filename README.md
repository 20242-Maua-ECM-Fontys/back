# Clean Architecure Microservice Typescript + AWS CDK API REST 🧙‍♂️⚠   

This project was made by myself, together with a lot of researches. This is a project Typescript for you that  want to learn more about clean 
architecture without a lot of problems that a lot of frameworks provides to us developers. You can use this project as a template to yours projects,
I hope you like!

| :placard: Clean Arch Microservice Typescript + AWS CDK API REST |     |
| -------------  | --- |
| :sparkles: Name | **Clean Arch API Rest**
| :label: Tecnologies | Typescript, Vitest, AWS CDK, Clean Architecture, SOLID 
| :rocket: Is this project for everyone? | If you want to learn more about clean architecture with typescript, yes!

### Folder Structure 🚀⚡️

```bash
.
├── iac
├── src
│   ├── modules
│   │   ├── create_user
│   │   │   └── app
│   │   ├── delete_user
│   │   │   └── app
│   │   ├── get_user
│   │   │   └── app
│   │   └── update_user
│   │       └── app
│   └── shared
│       ├── domain
│       │   ├── entities
│       │   ├── enums
│       │   └── repositories
│       ├── helpers
│       │   ├── enum
│       │   ├── errors
│       │   ├── functions
│       │   └── http
│       └── infra
│           ├── dto
│           ├── external
│           └── repositories
└── tests
    ├── modules
    │   ├── create_user
    │   │   └── app
    │   ├── delete_user
    │   │   └── app
    │   ├── get_user
    │   │   └── app
    │   └── update_user
    │       └── app
    └── shared
        ├── domain
        │   └── entities
        ├── helpers
        └── infra

```

## How can I run the project in my machine??

It's simple, you'll need this little requirements


| REQUIREMENTS |     |
| -------------  | --- |
| Node.js | (12+ version) |
| Yarn or npm | (npm you'll need to delete 'yarn.lock' file) |
| AWS CLI | (You'll need to configure your aws account) |
| Docker | (You'll need to configure your docker account) |
| SAM CLI | (You'll need to configure your aws account) |

### Now you're done ✅✅ Let's run it!!

- This first command that you'll need to run it on your terminal is about ☢ Git ☢

```zsh
git clone https://github.com/Rodrigosiq03/clean_mss_typescript_template.git
```

- Now you're with the project in your machine 🔥🔥 Let's enter there and install all the dependencies!!

```zsh
cd clean_mss_typescript_template
yarn
```

⚠ OR ⚠

```zsh
cd clean_mss_typescript_template
npm i
```

### An important thing that you need to know is that the iac folder <span style="color: red">[ NEED ]</span> to be on npm manager, so you'll need to run this command below

```zsh
cd iac && npm i
```

### Remember to start the docker on your machine, because the project will use the docker to run the project locally. And you'll need to run this command below to start the docker
- Go to iac folder, there you'll find a folder called local, go there and run the command below

```zsh
docker-compose up -d dynamodb-local
```

- Before you run the project you need to <span style="color: green">CREATE</span> a file called 🧙‍♂️ <span style="color: yellow">.env</span> 🧙‍♂️
- After creating you'll set a environment variable called <span style="color: red">STAGE</span>👽
## [ Remember that you <span style="color: red">[ NEED ]</span> to create this file in both projects (root dir and iac dir) ] ⚡️
- If you want to see more about the .env file, go to .env.example file 💼

```.env
STAGE=DEV
```

- After the config of the .env file, you'll need to run the command below to build the project, so <span style="color: red">on the root dir</span> run this command

```zsh
yarn build
```

- To avoid errors when running it locally you need to set the ecr on aws or the docker hub, so you'll need to run this command below

```zsh
 aws ecr-public get-login-password --region sa-east-1 | docker login --username AWS --password-stdin public.ecr.aws

```

### Go to the iac folder and run the command below

```zsh
cdk synth
```
- I'll explain to you what this command does:
  - First of all, this command will create a folder called <span style="color: yellow">cdk.out</span> on the root dir
  - Second, this command will create a file called <span style="color: yellow">STACK_NAME.template.json</span> on the <span style="color: yellow">cdk.out</span> folder
  - This folder is the most importante folder of the project, because it's the folder that the <span style="color: yellow">SAM CLI</span> will use to run the project locally
  - To finish the explantion of the command above, this command will create a folder called <span style="color: yellow">shared</span> on the <span style="color: yellow">cdk.out</span> folder, this folder is the folder that the <span style="color: yellow">SAM CLI</span> will use to run the project locally, this occurs because the file called <span style="color: yellow">adjust_layer_directory.ts</span> will be executed and this file will create a folder called <span style="color: yellow">nodejs</span> on the <span style="color: yellow">shared</span> folder, this folder is the folder that the <span style="color: yellow">SAM CLI</span> will use to run the project locally

### Now you need to run two commands of the SAM CLI:

```zsh
sam build -t ./cdk.out/dev.template.json
```
- This second command I created a script on the package.json file, so you'll need to run this command below

## Now you're <span style="color: pink">TOTALLY</span> prepared to run the project, so let's run it!!
```zsh
npm run start-local
```

## You're done ✔

#### Above I'll put the routes to be used

| ROUTES |     |
| -------------  | --- |
| <span style="color: red">Create (POST)</span> | <span style="color: yellow">mss-template/create-user</span> |
| <span style="color: red">Delete (POST)</span> | <span style="color: yellow">mss-template/delete-user?id=0</span> |
| <span style="color: red">Get All (GET)</span> | <span style="color: yellow">mss-template/get-all_users</span> |
| <span style="color: red">Get (GET)</span> | <span style="color: yellow">mss-template/get-user?id=0</span> |
| <span style="color: red">Update (POST)</span> | <span style="color: yellow">mss-template/update-user?id=0</span> |

- Routes that need a body on the request are <span style="color: yellow">mss-template/create-user</span> and <span style="color: yellow">mss-template/update-user?id=0</span>

## What kind of body⁉⁉⁉

- For the both you can use this example...
- Only for the create you need to pass and id on the body, but for the update you need to pass the id on the query params

```json
{
  "name": "Rodrigo Diana Siqueira",
  "email": "rodrigo.dsiqueira1@gmail.com",
  "state": "PENDING"
}
```

## For doubts, contact me on my social medias 🚀☎️

| SOCIAL MEDIAS |     |
| -------------  | --- |
| <span style="color: red">Linkedin</span> | <span style="color: yellow">https://www.linkedin.com/in/rodrigo-diana-siqueira-6b5b3b1a4/</span> |
| <span style="color: red">Instagram</span> | <span style="color: yellow">https://www.instagram.com/rodrigo_0.3/</span> |





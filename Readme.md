# Dependency

- "@types/node": "^17.0.10",
- "ts-node": "^10.4.0",
- "typescript": "^4.5.5"
- npx config.json  => choose node 
tsc -w sẽ dựa vào file config ts để gen ra dist 
- command when develop : tsc -w : to gen dist => then yarn server to run
- hoac 2 terminal : yarn watch , yarn server


- install PostgreSQL and PGAdmin 
- docker run --name redditpostgres -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=123456 -d postgres:14.1-alpine
- cài database trong postgres với ten là reddit
- yarn add pg : cài pg cho nodejs  
- yarn add express graphql apollo-server-express type-graphql class-validator reflect-metadata dotenv
- yarn add -D @types/express 
- yarn add typeorm  
# Note :
Create Entities . assign to type orm connection
apollo-server-express và type-graphql có thể tạo schema từ resolvers lun

yarn add express-session connect-mongo
yarn add -D @types/express-session
yarn add mongoose@5.10.18
yarn add -D @types/mongoose 


# Create client
yarn create next-app --example with-chakra-ui-typescript with-chkra-ui-typescript-app
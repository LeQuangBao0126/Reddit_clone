import "reflect-metadata"
require("dotenv").config()
import {ApolloServer} from "apollo-server-express";
import express from 'express'
import {buildSchema} from 'type-graphql'
import { createConnection } from 'typeorm'
import {ApolloServerPluginLandingPageLocalDefault, } from 'apollo-server-core'
import  mongoose from 'mongoose'
const session = require("express-session")
const MongoStore = require("connect-mongo")


import  {User} from './entities/User'
import  {Post} from './entities/Post'
import {HelloResolver} from "./resolvers/Hello";
import {UserResolver} from "./resolvers/user";
import {PostResolver} from "./resolvers/post";

 const main = async () =>{
    await createConnection({
        type: "postgres",
        database: "reddit",
        host: "localhost",
        port: 5432  ,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging : true,
        synchronize : true,
        entities :[User,Post],

    })
     const app = express()
     //Session , cookie store
     const mongoUrl = `mongodb://localhost:27017/test`
     await mongoose.connect(mongoUrl, { })
     app.use(function(req, res, next) {
         res.header('Access-Control-Allow-Origin', req.headers.origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         next();
     });
     app.use(session({
         name: "redditcookie",
         store: MongoStore.create({ mongoUrl }),
         cookie: {
             maxAge: 1000 * 60 * 60, // one hour
             httpOnly: true, // JS front end cannot access the cookie
             secure: false, // cookie only works in https
             sameSite: 'none'
         },
         secret: process.env.SESSION_SECRET_DEV_PROD as string,
         saveUninitialized: false, // don't save empty sessions, right from the start
         resave: false
     }) )

     const apolloServer = new ApolloServer({
          schema : await buildSchema({
              resolvers: [HelloResolver , UserResolver, PostResolver] ,validate : false
          }),
          context : ({req , res})  =>({req , res}),
          plugins : [ApolloServerPluginLandingPageLocalDefault]
     });
     await apolloServer.start()
     apolloServer.applyMiddleware({app })
     const PORT = process.env.PORT || 4000
     app.listen(PORT , () => {console.log(` Server starting on PORT ${ PORT } .GraphQL Server PORT ${PORT} , path ${apolloServer.graphqlPath}`)})

 }
 main().catch(err => console.log(err))




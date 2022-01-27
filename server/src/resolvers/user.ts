import {Resolver, Mutation, Arg,Ctx } from 'type-graphql'
import {User} from "../entities/User";
import {UserMutationResponse} from "../types/UserMutationResponse";
import {RegiterInput} from "../types/RegiterInput";
import {validateRegisterInput} from "../utils/validateRegisterInput";
import {LoginInput} from "../types/LoginInput";

import {Context} from './../types/Contexts'



//3h
@Resolver()

export class UserResolver {
   @Mutation(_returns => UserMutationResponse , {nullable :true})
    public async register ( @Arg('registerInput' ) registerInput : RegiterInput ) : Promise<UserMutationResponse>
    {
        const validateResult =  validateRegisterInput(registerInput) ;

        if(validateResult != null){
            return{
                code : 400 , success : false , ...validateResult
            }
        }

        const existingUser = await  User.findOne({
            where: [{ email: registerInput.email } , {username : registerInput.username}]
        })
        // ko cần xài thư vien validate
        if(existingUser) {
            return  {
                code : 400 , success : false ,
                message: "Duplicate username or email",
                errors : [{
                    field :  existingUser.username == registerInput.username ? 'username' : 'email',
                    message:  existingUser.username == registerInput.username  ? 'username already took' : 'email already took'
                }]
            }
        }
        let userNew = User.create({
            email: registerInput.email,
            username: registerInput.username,
            password : registerInput.password
        })
        const u = await User.save(userNew)

        return  {
            code : 200 ,
            success : true ,
            message: "",
            data : u
        }
    }

   @Mutation(_returns => UserMutationResponse , {nullable : true})
   public async login (
      @Arg("loginInput") loginInput : LoginInput,
      @Ctx() ctx : Context
   ) : Promise<UserMutationResponse> {

       const existingUser = await  User.findOne({
           where: {email : loginInput.usernameOrEmail , password : loginInput.password}
       })

       if(!existingUser) {
           return  {
               code : 400 , success : false ,
               message: "Invalid Email or Password",
               errors : [ ]
           }
       }
       //session userid
       //cho nay nen coi lai chỗ định cho nó & type
       ctx.req.session.userId = existingUser.id

       return  {
           code : 200 ,
           success : true ,
           message: "Login success",
       }
   }

   @Mutation(_returns => String , {nullable : true})
   public profile(@Ctx() ctx :Context){
       console.log(ctx.req.headers)
       return "hello"
   }

}


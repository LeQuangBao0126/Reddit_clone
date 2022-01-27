import {Field, InputType} from "type-graphql";
import {IsEmail} from "class-validator";

@InputType()
export class RegiterInput {

    @Field(_type=> String)
    @IsEmail()
    email : string

    @Field()
    username : string

    @Field()
    password : string
}


import {Field, ObjectType} from "type-graphql";
import {IMutationResponse} from "./MutationResponse";
import {User} from "../entities/User";
import {FieldError} from "./FieldError";

@ObjectType({ implements: IMutationResponse })
export  class  UserMutationResponse implements  IMutationResponse {
    code: number;
    message?: string;
    success: boolean;

    @Field({nullable: true})
    data? : User

    @Field(_type => [FieldError], {nullable:true})
    errors?:  FieldError[]
}
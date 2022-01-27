import {RegiterInput} from "../types/RegiterInput";

export const validateRegisterInput = (registerInput : RegiterInput )  =>{
    if(!registerInput.email.includes("@"))
        return {
            message : "Invalid Email",
            errors : [
                { field : "Email",message : "Email must include @ symbol" }
            ]
        }
    if(registerInput.username.length <= 2){
        return {
            message : "Invalid username",
            errors : [
                { field : "username",message : "username must be greater than 2 character" }
            ]
        }
    }
    return null
}
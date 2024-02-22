import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDTO {

    @IsString()
    name: string;
    
    @IsEmail()
    email: string;

    @IsStrongPassword({
       minLength: 8,
       minNumbers: 0,
       minLowercase: 0,
       minUppercase:0,
       minSymbols:  0
    })
    password:  string

    @IsOptional()
    @IsString()
    birthAt: string; 
}
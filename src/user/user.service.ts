import { Injectable, NotFoundException} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { PutUserDTO } from "./dto/update-put-user.dto";
import { PatchUserDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService {

    constructor (private readonly  prisma: PrismaService) {}

   async create(data:  CreateUserDTO) {
          
       return this.prisma.user.create(
              {
                data,
              }
           )
    }

    async  read() {
        return this.prisma.user.findMany()
    }

    
    async  onRead(id: number) {
        await this.exists(id);

        return this.prisma.user.findUnique(
            {
            where:{
                id
            }}
        )
    }

    async  update(id: number, {name, email, password, birthAt}: PutUserDTO ) {
        
        await this.exists(id);

        return this.prisma.user.update({
            data:  {name, email, password, birthAt: birthAt ? new Date(birthAt) : null},
            where:{
                id
            }
        });
    }

    async  updatePartial(id: number, {name, email, password, birthAt}: PatchUserDTO ) {
        
        const data :  any = {};

        await this.exists(id);


        if(birthAt) {
            data.birthAt =  new Date(birthAt)
        }

        if(name) {
            data.name =  name
        }

        if(email) {
            data.email =  email
        }

        if(password) {
            data.password =  password
        }
        
        return this.prisma.user.update({
            data,
            where:{
                id
            }}
        );
    }

    async  delete(id: number ) {
       await this.exists(id);

        return this.prisma.user.delete({
            where:{
                id
            }}
        );
    }

    async exists(id: number) {
        if(!(await this.prisma.user.count( {
           where:  {
            id
           }
        }))) {
          
        throw new  NotFoundException("Usuario com Id não existe !")

        }

    }
}


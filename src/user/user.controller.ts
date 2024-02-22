import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PutUserDTO } from './dto/update-put-user.dto';
import { PatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { logInterpector } from 'src/interpectors/log.interceptor';

@Controller('user')
export class UserController {

    constructor (private  readonly userService:  UserService) {}
    
    @UseInterceptors(logInterpector)
    @Post() 
    async create(@Body() data: CreateUserDTO) {
        return this.userService.create(data);
    }

    @Get() 
    async read() {
        return this.userService.read();
    }

    @Get(':id') 
    async onRead(@Param('id', ParseIntPipe) id:  number) {
        return  this.userService.onRead(id); 
    }

    @Put(':id') 
    async  update(@Body()  data:  PutUserDTO,  @Param('id', ParseIntPipe) id:  number)  {
        return this.userService.update(id, data)
    }

    @Patch(':id') 
    async  updateParcial(@Body() data:  PatchUserDTO,  @Param('id', ParseIntPipe) id:  number)  {
        return this.userService.updatePartial(id, data)

    }

    @Delete(':id') 
    async  delete(@Param('id', ParseIntPipe) id: number)  {
        return  this.userService.delete(id);

    }    
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdateUserDTO } from './dto/update-put-user.dto';

@Controller('users')
export class UserController {
  @Post()
  @HttpCode(200)
  async create(@Body() { name, email, password }: CreateUserDTO) {
    return { name, email, password };
  }

  @Get()
  async read() {
    return { users: [] };
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return { user: {}, id };
  }

  @Put(':id')
  async update(
    @Body() { name, email, password }: UpdateUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return { method: 'PUT', name, email, password, id };
  }

  @Patch(':id')
  async updatePartial(
    @Body() { name, email, password }: UpdatePatchUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      method: 'Patch',
      name,
      email,
      password,
      id,
    };
  }

  @Delete(':id')
  @HttpCode(202)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}

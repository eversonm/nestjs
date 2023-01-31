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
  async readOne(@Param() params) {
    return { user: {}, params };
  }

  @Put(':id')
  async update(
    @Body() { name, email, password }: UpdateUserDTO,
    @Param() params,
  ) {
    return { method: 'PUT', name, email, password, params };
  }

  @Patch(':id')
  async updatePartial(
    @Body() { name, email, password }: UpdatePatchUserDTO,
    @Param() params,
  ) {
    return {
      method: 'Patch',
      name,
      email,
      password,
      params,
    };
  }

  @Delete(':id')
  @HttpCode(202)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}

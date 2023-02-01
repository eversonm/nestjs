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
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async read() {
    return this.userService.read();
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.readOne(id);
  }

  @Put(':id')
  async update(
    @Body() data: UpdateUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(
    @Body() data: UpdatePatchUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  @HttpCode(202)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}

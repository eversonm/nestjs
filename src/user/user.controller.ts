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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdateUserDTO } from './dto/update-put-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a user using name, email and password at least',
  })
  @ApiResponse({ status: 201, description: 'Created.' })
  @ApiBody({type: CreateUserDTO})
  async create(@Body() data: CreateUserDTO): Promise<User> {
    return this.userService.create(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Read all users',
    description: 'Read all users from database',
  })
  async read() {
    return this.userService.read();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Read only one user',
    description: 'Read only one user from database',
  })
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.readOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update info from one user',
    description: 'Update the user information',
  })
  async update(
    @Body() data: UpdateUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.update(id, data);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update partially info from one user',
    description: 'Update partially user information',
  })
  async updatePartial(
    @Body() data: UpdatePatchUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  @HttpCode(202)
  @ApiOperation({
    summary: 'Delete one user',
    description: 'Delete a user from database',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}

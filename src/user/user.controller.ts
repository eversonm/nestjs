import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParamId } from '../decorators/param-id.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdateUserDTO } from './dto/update-put-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
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
  @ApiBody({ type: CreateUserDTO })
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  // @SkipThrottle()
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
  async readOne(@ParamId() id: number) {
    return this.userService.readOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update info from one user',
    description: 'Update the user information',
  })
  async update(@Body() data: UpdateUserDTO, @ParamId() id: number) {
    return this.userService.update(id, data);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update partially info from one user',
    description: 'Update partially user information',
  })
  async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number) {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  @HttpCode(202)
  @ApiOperation({
    summary: 'Delete one user',
    description: 'Delete a user from database',
  })
  async delete(@ParamId() id: number) {
    return {
      success: await this.userService.delete(id),
    };
  }
}

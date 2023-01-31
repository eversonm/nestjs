import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  @Post()
  @HttpCode(200)
  async create(@Body() body) {
    return { body };
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
  async update(@Body() body, @Param() params) {
    return { method: 'PUT', body, params };
  }

  @Patch(':id')
  async updatePartial(@Body() body, @Param() params) {
    return {
      method: 'Patch',
      body,
      params,
    };
  }

  @Delete(':id')
  @HttpCode(202)
  async delete(@Param() params) {
    return { params };
  }
}

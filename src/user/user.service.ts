import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdateUserDTO } from './dto/update-put-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async read(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async readOne(id: number): Promise<User> {
    await this.exists(id);
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, { email, name, password, birthAt }: UpdateUserDTO) {
    await this.exists(id);

    if (!birthAt) {
      birthAt = null;
    }
    return this.prisma.user.update({
      data: {
        email,
        name,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
      where: {
        id,
      },
    });
  }

  async updatePartial(
    id: number,
    { email, name, password, birthAt }: UpdatePatchUserDTO,
  ) {
    await this.exists(id);

    const data: any = {};
    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }
    if (email) {
      data.email = email;
    }
    if (name) {
      data.name = name;
    }
    if (password) {
      data.password = password;
    }
    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }
  async delete(id: number) {
    await this.exists(id);

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number) {
    if (!(await this.prisma.user.count({
      where: {
        id
      }
    }))) {
      throw new NotFoundException(`O usuário com id: ${id} não existe!`);
    }
  }
}

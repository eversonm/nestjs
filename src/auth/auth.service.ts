import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthRegisterDTO } from './dto/auth-register.dto';

import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailer: MailerService,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async createToken(user: UserEntity) {
    const token = await this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
      },
      {
        expiresIn: '7 days',
        subject: String(user.id),
        issuer: this.issuer,
        audience: this.audience,
      },
    );
    return {
      accessToken: token,
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });
      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha estão incorretos.');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email e/ou senha estão incorretos.');
    }
    // return this.createToken(user);
    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email está incorreto.');
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '30 minutes',
        subject: String(user.id),
        issuer: 'forget',
        audience: 'users',
      },
    );
    await this.mailer.sendMail({
      subject: 'recuperação de senha',
      to: 'eversonm@email.com',
      template: 'forget',
      context: {
        name: user.name,
        token,
      },
    });
    return { success: true };
  }

  async reset(password: string, token: string) {
    try {
      const data: any = this.jwtService.verify(token, {
        issuer: 'forget',
        audience: 'users',
      });
      if (isNaN(Number(data.id))) {
        throw new BadRequestException('token invalido');
      }

      password = await bcrypt.hash(password, await bcrypt.genSalt());
      await this.usersRepository.update(Number(data.id), { password });
      const user = await this.userService.readOne(Number(data.id));
      return this.createToken(user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async register(data: AuthRegisterDTO) {
    delete data.role;
    const user = await this.userService.create(data);
    return this.createToken(user);
  }
}

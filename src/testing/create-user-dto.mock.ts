import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dto/create-user.dto';

export const createUserDTO: CreateUserDTO = {
  birthAt: '2000-01-01',
  email: 'name@email.com',
  name: 'Some User',
  password: '123456a',
  role: Role.User,
};

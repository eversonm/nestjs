import { Role } from '../enums/role.enum';
import { UpdateUserDTO } from '../user/dto/update-put-user.dto';

export const updatePutUserDTO: UpdateUserDTO = {
  birthAt: '2000-01-01',
  email: 'name@email.com',
  name: 'Some User',
  password: '123456a',
  role: Role.User,
};

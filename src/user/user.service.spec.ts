import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDTO } from '../testing/create-user-dto.mock';
import { updatePatchUserDTO } from '../testing/update-patch-user-dto.mock';
import { updatePutUserDTO } from '../testing/update-put-user-dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { usersRepositoryMock } from '../testing/user-repository.mock';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let usersRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, usersRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    usersRepository = module.get(getRepositoryToken(UserEntity))
  });

  test('Validar a definição', () => {
    expect(userService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('Create', () => {
    test('POST', async () => {
      jest.spyOn(usersRepository, 'exist').mockResolvedValueOnce(false);
      const result = await userService.create(createUserDTO);

      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Read', () => {
    test('READ', async () => {
      const result = await userService.read();

      expect(result).toEqual(userEntityList);
    });

    test('READ one', async () => {
      const result = await userService.readOne(1);

      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Update', () => {
    test('PUT', async () => {
        const result = await userService.update(1, updatePutUserDTO);
  
        expect(result).toEqual(userEntityList[0]);
      });
  
      test('PATCH', async () => {
        const result = await userService.updatePartial(1, updatePatchUserDTO);
  
        expect(result).toEqual(userEntityList[0]);
      });
  });
  describe('Delete', () => {
    test('DELETE', async () => {
        const result = await userService.delete(1);
        expect(result).toEqual(true);
      });
  });
});

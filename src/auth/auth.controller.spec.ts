import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../guards/auth.guard';
import { accessToken } from '../testing/access-token.mock';
import { authForgetDTO } from '../testing/auth-forget-dto.mock';
import { authLoginDto } from '../testing/auth-login-dto.mock';
import { authRegisterDTO } from '../testing/auth-register.mock';
import { authResetDTO } from '../testing/auth-reset-dto.mock';
import { authServiceMock } from '../testing/auth-service.mock';
import { fileServiceMock } from '../testing/file-service.mock';
import { getPhoto } from '../testing/get-photo.mock';
import { guardMock } from '../testing/guard.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  test('Validar a definição', () => {
    expect(authController).toBeDefined();
  });

  describe('Auth flow', () => {
    test('Login', async () => {
      const result = await authController.login(authLoginDto);
      expect(result).toEqual({ accessToken });
    });

    test('Register', async () => {
      const result = await authController.register(authRegisterDTO);
      expect(result).toEqual({ accessToken });
    });

    test('Forget', async () => {
      const result = await authController.forget(authForgetDTO);
      expect(result).toEqual({ success: true });
    });

    test('Reset', async () => {
      const result = await authController.reset(authResetDTO);
      expect(result).toEqual({ accessToken });
    });
  });

  describe('Authenticated Routes', () => {
    test('CheckToken', async () => {
      const result = await authController.check(userEntityList[0]);
      expect(result).toEqual(userEntityList[0]);
    });

    test('UploadPhoto', async () => {
      const photo = await getPhoto();
      const result = await authController.uploadPhoto(userEntityList[0], photo);
      expect(result).toEqual(photo);
    });
  });
});

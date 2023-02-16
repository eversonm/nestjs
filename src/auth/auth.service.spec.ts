import { Test, TestingModule } from '@nestjs/testing';
import { accessToken } from '../testing/access-token.mock';
import { authRegisterDTO } from '../testing/auth-register.mock';
import { jwtPayload } from '../testing/jwt-payload.mock';
import { jwtServiceMock } from '../testing/jwt-service.mock';
import { mailerServiceMock } from '../testing/mailer-service.mock';
import { resetToken } from '../testing/reset-token.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { usersRepositoryMock } from '../testing/user-repository.mock';
import { userServiceMock } from '../testing/user-service.mock';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        usersRepositoryMock,
        jwtServiceMock,
        userServiceMock,
        mailerServiceMock,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  test('Validar a definição', () => {
    expect(AuthService).toBeDefined();
  });

  describe('Token', () => {
    test('CreateToken', async () => {
      const result = await authService.createToken(userEntityList[0]);

      expect(result).toEqual({
        accessToken,
      });
    });

    test('CheckToken', () => {
      const result = authService.checkToken(accessToken);

      expect(result).toEqual(jwtPayload);
    });

    test('isValidToken', () => {
      const result = authService.isValidToken(accessToken);

      expect(result).toEqual(true);
    });
  });
  describe('Auth', () => {
    test('Login', async () => {
      const result = await authService.login('nome@email.com', '123456a');

      expect(result).toEqual({ accessToken });
    });

    test('Forget', async () => {
      const result = await authService.forget('nome@email.com');

      expect(result).toEqual(true);
    });

    test('Reset', async () => {
      const result = await authService.reset('123456b', resetToken);

      expect(result).toEqual({ accessToken });
    });

    test('Register', async () => {
      const result = await authService.register(authRegisterDTO);

      expect(result).toEqual({ accessToken });
    });
  });
  describe('token', () => {});
});

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    const newAuth = (authorization ?? '').split(' ')[1];

    try {
      const data = this.authService.checkToken(newAuth);

      request.user = await this.userService.readOne(data.id);
      
      request.tokenPayload = data;
      return true;
    } catch (e) {
      return false;
    }
  }
}

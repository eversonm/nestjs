import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const User = createParamDecorator(
  (filter: string | unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (request.user) {
      return {
        id: request.user.id,
        name: request.user.name,
        email: request.user.email,
      };
    } else {
      throw new NotFoundException('Usuário não encontrado no request');
      // Use o AuthGuard para obter o usuário
    }
  },
);

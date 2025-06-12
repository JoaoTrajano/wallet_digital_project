import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  UsePipes,
} from '@nestjs/common';

import { AuthenticateUserUseCase } from '@/auth/application/use-cases/authenticate-user.usecase';

import { AuthBody, AuthBodyPipe } from '../pipes/validations/auth-body';

@Controller('authentication')
export class AuthController {
  constructor(
    @Inject('AuthenticateUserUseCase')
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Post()
  @HttpCode(200)
  @UsePipes(AuthBodyPipe)
  async createUser(@Body() body: AuthBody) {
    const { user, access_token } = await this.authenticateUserUseCase.execute({
      email: body.email,
      password: body.password,
    });

    return { user, access_token };
  }
}

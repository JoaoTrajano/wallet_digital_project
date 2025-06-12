import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { AuthGuard } from '@/auth/infrastructure/guards/auth.guard';
import { CurrentUser } from '@/auth/presentation/decorators/current-user.decorator';
import { RegisterUserUseCase } from '@/users/application/use-cases';
import { AccountUseCase } from '@/users/application/use-cases/account.usecase';
import { ListUsersToTransferUseCase } from '@/users/application/use-cases/list-users-to-transfer';
import { UserEntity } from '@/users/domain/entities/user.entity';

import { RegisterUserBody, RegisterUserBodyPipe } from '../pipes/validations';
import { UserPresenter } from '../presenter/user.presenter';

@Controller('users')
export class UserController {
  constructor(
    @Inject('RegisterUserUseCase')
    private readonly registerUserUseCase: RegisterUserUseCase,
    @Inject('AccountUseCase')
    private readonly accountUseCase: AccountUseCase,
    @Inject('ListUsersToTransferUseCase')
    private readonly listUsersToTransferUseCase: ListUsersToTransferUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(RegisterUserBodyPipe)
  async createUser(@Body() body: RegisterUserBody) {
    const { user } = await this.registerUserUseCase.execute({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    return user;
  }

  @Get('/users-to-transfer')
  @UseGuards(AuthGuard)
  async allUsers(@CurrentUser() user: UserEntity) {
    const output = await this.listUsersToTransferUseCase.execute({ user });
    return UserPresenter.mapUsersFromOutput(output);
  }

  @Get('/account')
  @UseGuards(AuthGuard)
  async account(@CurrentUser() user: UserEntity) {
    const output = await this.accountUseCase.execute({ user });
    return output.user;
  }
}

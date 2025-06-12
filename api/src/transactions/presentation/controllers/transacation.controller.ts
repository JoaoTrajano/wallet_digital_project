import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Query } from '@nestjs/common';

import { AuthGuard } from '@/auth/infrastructure/guards/auth.guard';
import { CurrentUser } from '@/auth/presentation/decorators/current-user.decorator';
import { CreateNewTransactionUseCase } from '@/transactions/application/use-cases/create-new-transacation.usecase';
import { FetchAllTransactionsUseCase } from '@/transactions/application/use-cases/fetch-all-transacations.usecase';
import { RevertTransactionUseCase } from '@/transactions/application/use-cases/revert-transacation.usecase';
import { UserEntity } from '@/users/domain/entities/user.entity';

import { CreateNewTransactionBody } from './pipe/validations/create-new-transaction';
import { RevertTransactionBodyBody } from './pipe/validations/revert-transaction';

@Controller('transactions')
export class TransactionsController {
  constructor(
    @Inject('CreateTransactionUseCase')
    private readonly createTransactionUseCase: CreateNewTransactionUseCase,
    @Inject('FetchAllTransactionsUseCase')
    private readonly fetchAllTransactionsUseCase: FetchAllTransactionsUseCase,
    @Inject('RevertTransactionUseCase')
    private readonly revertTransactionUseCase: RevertTransactionUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async createTransaction(
    @CurrentUser() user: UserEntity,
    @Body() body: CreateNewTransactionBody,
  ) {
    const transaction = await this.createTransactionUseCase.execute({
      user,
      type: body.type,
      value: Number(body.value),
      description: body.description,
      billId: body.billId,
      destinationId: body.destinationId,
    });

    return transaction;
  }

  @Post('/revert')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async revertTransaction(@Body() body: RevertTransactionBodyBody) {
    const transaction = await this.revertTransactionUseCase.execute({
      transactionId: body.transactionId,
    });

    return transaction;
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async fetchAllTransactions(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ) {
    const transactions = await this.fetchAllTransactionsUseCase.execute({
      page: Number(page),
      perPage: Number(perPage),
    });

    return transactions;
  }
}

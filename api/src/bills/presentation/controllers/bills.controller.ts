import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@/auth/infrastructure/guards/auth.guard';
import { CurrentUser } from '@/auth/presentation/decorators/current-user.decorator';
import { CreateBillUseCase } from '@/bills/application/use-cases/create-bill.usecase';
import { DeleteBillUseCase } from '@/bills/application/use-cases/delete-bill.usecase';
import { FetchAllBillsUseCase } from '@/bills/application/use-cases/fetch-all-bill.usecase';
import { UserEntity } from '@/users/domain/entities/user.entity';

import { CreateBillBody } from '../pipes/validations/create-bill';
import { DeleteBillBody } from '../pipes/validations/delete-bill';

@Controller('bills')
export class BillsController {
  constructor(
    @Inject('CreateBillUseCase')
    private readonly createBillUseCase: CreateBillUseCase,
    @Inject('FetchAllBillsUseCase')
    private readonly fetchAllBillsUseCase: FetchAllBillsUseCase,
    @Inject('DeleteBillUseCase')
    private readonly deleteBillUseCase: DeleteBillUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async createBill(
    @CurrentUser() user: UserEntity,
    @Body() body: CreateBillBody,
  ) {
    const bill = await this.createBillUseCase.execute({
      user,
      name: body.name,
      amount: Number(body.amount),
    });

    return bill;
  }

  @Delete()
  @UseGuards(AuthGuard)
  @HttpCode(204)
  async deleteBill(@Body() body: DeleteBillBody) {
    await this.deleteBillUseCase.execute({
      billId: body.billId,
    });
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async fetchBills() {
    const output = await this.fetchAllBillsUseCase.execute();

    return output;
  }
}

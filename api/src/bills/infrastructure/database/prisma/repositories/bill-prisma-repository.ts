import { BillEntity } from '@/bills/domain/entities/bill.entity';
import { BillRepository } from '@/bills/domain/entities/repositories/bill.repository';
import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service';

import { BillPrismaMapper } from '../mappers/bill.prisma-mapper';

export class BillPrismaRepository implements BillRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(bill: BillEntity): Promise<BillEntity> {
    const billCreated = await this.prismaService.bill.create({
      data: BillPrismaMapper.toPersistence(bill),
      include: {
        user: true,
      },
    });

    return BillPrismaMapper.toDomain(billCreated);
  }

  async update(bill: BillEntity): Promise<BillEntity> {
    const billUpdated = await this.prismaService.bill.update({
      where: { id: bill.id },
      data: BillPrismaMapper.toPersistence(bill),
      include: {
        user: true,
      },
    });

    return BillPrismaMapper.toDomain(billUpdated);
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.bill.delete({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async fetchAll(): Promise<BillEntity[]> {
    const bills = await this.prismaService.bill.findMany({
      include: {
        user: true,
      },
      orderBy: { amount: 'desc' },
    });
    return bills.map(BillPrismaMapper.toDomain);
  }

  async fetchById(id: string): Promise<BillEntity | null> {
    const bill = await this.prismaService.bill.findUnique({
      where: { id },
      include: {
        user: true,
        transactions: {
          include: {
            bill: {
              include: { user: true },
            },
          },
        },
      },
    });
    return bill ? BillPrismaMapper.toDomain(bill) : null;
  }

  async fetchByUserId(userId: string): Promise<BillEntity[]> {
    const bills = await this.prismaService.bill.findMany({
      where: { userId },
      include: {
        user: true,
      },
    });
    return bills.map(BillPrismaMapper.toDomain);
  }
}

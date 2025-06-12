import { Global, Module } from '@nestjs/common';

import { PrismaService } from './infrastructure/database/postgres/adapters/prisma/prisma.service';
import { EnvModule } from './infrastructure/env/env.module';

@Global()
@Module({
  imports: [EnvModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class SharedModule {}

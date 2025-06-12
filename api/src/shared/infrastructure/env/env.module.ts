import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvService } from './env.service';

@Module({
  providers: [EnvService, ConfigService],
  exports: [EnvService],
})
export class EnvModule {}

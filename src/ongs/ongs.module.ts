import { Module } from '@nestjs/common';
import { OngsService } from './ongs.service';
import { OngsController } from './ongs.controller';

@Module({
  providers: [OngsService],
  controllers: [OngsController]
})
export class OngsModule {}

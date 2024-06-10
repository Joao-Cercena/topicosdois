import { Module } from '@nestjs/common';
import { OngsService } from './ongs.service';
import { OngsController } from './ongs.controller';
import { OngsEntity } from './ongs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OngsEntity])],
  providers: [OngsService],
  controllers: [OngsController]
})
export class OngsModule {}

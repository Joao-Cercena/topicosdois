import { Module } from '@nestjs/common';
import { SetorController } from './setor.controller';
import { SetorService } from './setor.service';
import { SetorEntity } from './setor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SetorEntity])],
  controllers: [SetorController],
  providers: [SetorService]
})
export class SetorModule {}

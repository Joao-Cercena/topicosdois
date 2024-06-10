import { Module } from '@nestjs/common';
import { SetorController } from './setor.controller';
import { SetorService } from './setor.service';
import { SetorEntity } from './setor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OngsEntity } from 'src/ongs/ongs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SetorEntity, OngsEntity])],
  controllers: [SetorController],
  providers: [SetorService]
})
export class SetorModule {}

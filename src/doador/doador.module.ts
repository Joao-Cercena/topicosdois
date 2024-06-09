import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoadorEntity } from './doador.entity';
import { DoadorController } from './doador.controller';
import { DoadorService } from './doador.service';

@Module({
  imports: [TypeOrmModule.forFeature([DoadorEntity])],
  controllers: [DoadorController],
  providers: [DoadorService],
})
export class DoadorModule {}

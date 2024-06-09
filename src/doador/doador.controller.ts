import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { DoadorEntity } from './doador.entity';
import { DoadorService } from './doador.service';

@Controller('doadores')
export class DoadorController {
  constructor(private readonly doadorService: DoadorService) {}

  @Get()
  async findAll(): Promise<DoadorEntity[]> {
    return this.doadorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DoadorEntity> {
    return this.doadorService.findOne(id);
  }

  @Post()
  async create(@Body() doadorData: DoadorEntity): Promise<DoadorEntity> {
    return this.doadorService.create(doadorData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() doadorData: DoadorEntity): Promise<DoadorEntity> {
    return this.doadorService.update(id, doadorData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.doadorService.remove(id);
  }
}

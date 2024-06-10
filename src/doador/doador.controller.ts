import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { DoadorEntity } from './doador.entity';
import { DoadorService } from './doador.service';

@Controller('doadores')
export class DoadorController {
  constructor(private readonly doadorService: DoadorService) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.doadorService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DoadorEntity> {
    return this.doadorService.findOne(id);
  }

  @Get('search')
  async search(@Query() query: any) {
  return this.doadorService.search(query);
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

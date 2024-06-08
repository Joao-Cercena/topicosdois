import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { SetorService } from './setor.service';
  import { SetorDto } from './setor.dto';
  
  @Controller('setor')
  export class SetorController {
    constructor(private setorService: SetorService) {}
  
    @Get()
    findAll() {
      return this.setorService.findAll();
    }
  
    @Get(':id')
    findById(@Param('id') id: string) {
      return this.setorService.findById(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.setorService.remove(id);
    }
  
    @Post()
    create(@Body() dto: SetorDto) {
      return this.setorService.create(dto);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: SetorDto) {
      return this.setorService.update({ id, ...dto });
    }
  }
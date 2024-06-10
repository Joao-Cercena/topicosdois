import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query
  } from '@nestjs/common';
  import { SetorService } from './setor.service';
  import { SetorDto } from './setor.dto';
  
  @Controller('setor')
  export class SetorController {
    constructor(private setorService: SetorService) {}
  
    @Get()
    async findAll(
      @Query('page') page: number,
      @Query('limit') limit: number,
    ) {
      return this.setorService.findAll(page, limit);
    }
  
    @Get(':id')
    findById(@Param('id') id: string) {
      return this.setorService.findById(id);
    }

    @Get('search')
    async search(@Query() query: any) {
    return this.setorService.search(query);
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
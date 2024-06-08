import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { OngsService } from './ongs.service';
  import { OngsDto } from './ongs.dto';
  
  @Controller('ongs')
  export class OngsController {
    constructor(private ongsService: OngsService) {}
  
    @Get()
    findAll() {
      return this.ongsService.findAll();
    }
  
    @Get(':id')
    findById(@Param('id') id: string) {
      return this.ongsService.findById(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.ongsService.remove(id);
    }
  
    @Post()
    create(@Body() dto: OngsDto) {
      return this.ongsService.create(dto);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: OngsDto) {
      return this.ongsService.update({ id, ...dto });
    }
  }
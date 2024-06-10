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
  import { OngsService } from './ongs.service';
  import { OngsDto } from './ongs.dto';
  
  @Controller('ongs')
  export class OngsController {
    constructor(private ongsService: OngsService) {}
  
    @Get()
    async findAll(
      @Query('page') page: number,
      @Query('limit') limit: number,
    ) {
      return this.ongsService.findAll(page, limit);
    }
  
    @Get(':id')
    async findById(@Param('id') id: string) {
      return this.ongsService.findById(id);
    }

    @Get('search')
    async search(@Query() query: any) {
    return this.ongsService.search(query);
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
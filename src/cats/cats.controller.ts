import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from './filter/http-exception.filter';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Post()
  create(@Body() cat: any) {
    return this.catsService.create(cat);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.catsService.findOne(id);
  }
}

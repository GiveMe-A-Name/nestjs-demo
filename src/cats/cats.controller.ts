import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
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
    return this.findOne(id);
  }
}

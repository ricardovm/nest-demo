import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get(':id')
  findOne(@Res({ passthrough: true }) res: Response, @Param() params) {
    let cat = this.catsService.get(params.id);

    if (cat == null) {
      res.status(HttpStatus.NOT_FOUND).send();
    } else {
      res.status(HttpStatus.OK).json(cat);
    }
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}

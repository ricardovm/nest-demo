import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res, UseFilters } from '@nestjs/common';
import { Response } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
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

  @Get('/get/error')
  async getError(): Promise<Cat[]> {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Get('/get/error2')
  async getError2(): Promise<Cat[]> {
    throw new BadRequestException('Oh no! Bad request!');
  }
}

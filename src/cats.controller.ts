import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateCatDto } from "./create-cat.dto";

@Controller('cats')
export class CatsController {
    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        return `This action adds a new cat: ${JSON.stringify(createCatDto)}`;
    }

    @Get(':id')
    findOne(@Param() params): string {
        console.log(params.id);
        return `This action returns a #${params.id} cat`;
    }

    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }
}
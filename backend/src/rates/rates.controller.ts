// src/rates/rates.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RatesService } from './rates.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';

@Controller('rates')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  // Endpoints
  @Post()
  create(@Body() createDto: CreateRateDto) {
    return this.ratesService.create(createDto);
  }

  @Get()
  findAll() {
    return this.ratesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratesService.findOne(+id);
  }

  // PATCH para actualizar
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateRateDto) {
    return this.ratesService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratesService.remove(+id);
  }
}
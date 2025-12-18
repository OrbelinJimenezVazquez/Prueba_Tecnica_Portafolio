// src/services/services.controller.ts archivo controlador 
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
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  // Endpoints
  @Post()
  create(@Body() createDto: CreateServiceDto) {
    return this.servicesService.create(createDto);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }

  // Endpoint anidado
  @Get(':id/rates')
  getRatesByService(@Param('id') serviceId: string) {
    return this.servicesService.getRatesByService(+serviceId);
  }
}
// src/providers/providers.controller.ts
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Patch, 
  Delete, 
  UsePipes, 
  ValidationPipe
} from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Controller('providers')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class ProvidersController {
  constructor(
    private readonly providersService: ProvidersService,
  ) {}
  
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Get()
  findAll() {
    return this.providersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.providersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateProviderDto) {
    return this.providersService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(+id);
  }

  // ✅ Endpoint corregido: delega al servicio
  @Get(':id/services')
  async getServicesByProvider(@Param('id') providerId: string) {
    return this.providersService.getServicesByProvider(+providerId);
  }
}
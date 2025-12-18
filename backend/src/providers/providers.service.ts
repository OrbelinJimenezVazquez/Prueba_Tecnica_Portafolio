// src/providers/providers.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './entities/provider.entity';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  create(createProviderDto: CreateProviderDto): Promise<Provider> {
    const provider = this.providerRepository.create(createProviderDto);
    return this.providerRepository.save(provider);
  }

  findAll(): Promise<Provider[]> {
    return this.providerRepository.find();
  }

  async findOne(id: number): Promise<Provider> {
    const provider = await this.providerRepository.findOne({ where: { id } });
    if (!provider) {
      throw new BadRequestException('Proveedor no encontrado');
    }
    return provider;
  }

  async update(id: number, updateDto: UpdateProviderDto): Promise<Provider> {
    await this.providerRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const provider = await this.providerRepository.findOne({
      where: { id },
      relations: ['services'],
    });

    if (!provider) {
      throw new BadRequestException('Proveedor no encontrado');
    }

    if (provider.services && provider.services.length > 0) {
      throw new BadRequestException('No se puede eliminar: la entidad tiene registros dependientes.');
    }

    await this.providerRepository.delete(id);
  }

  // ✅ Método nuevo: carga la relación correctamente
  async getServicesByProvider(providerId: number): Promise<any[]> {
    const provider = await this.providerRepository.findOne({
      where: { id: providerId },
      relations: ['services'],
    });

    if (!provider) {
      throw new BadRequestException('Proveedor no encontrado');
    }

    return provider.services;
  }
}
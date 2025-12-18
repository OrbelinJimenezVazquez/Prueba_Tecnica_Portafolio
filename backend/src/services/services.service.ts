import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from '../rates/entities/rate.entity';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(Rate) 
    private rateRepository: Repository<Rate>,
  ) {}

  create(createServiceDto: CreateServiceDto): Promise<Service> {
    const service = this.serviceRepository.create(createServiceDto);
    return this.serviceRepository.save(service);
  }

  findAll(): Promise<Service[]> {
    return this.serviceRepository.find({ relations: ['provider'] });
  }

  async findOne(id: number): Promise<Service> {
    const service = await this.serviceRepository.findOne({ 
      where: { id }, 
      relations: ['provider'] 
    });
    if (!service) {
      throw new BadRequestException('Servicio no encontrado');
    }
    return service;
  }

  async getRatesByService(serviceId: number): Promise<Rate[]> {
  return this.rateRepository.find({
    where: { service: { id: serviceId } },
    relations: ['service'],
  });
  }
  async update(id: number, updateDto: UpdateServiceDto): Promise<Service> {
  // Cargar el servicio con su relación
  const service = await this.serviceRepository.findOne({ where: { id } });
  if (!service) {
    throw new BadRequestException('Servicio no encontrado');
  }
  Object.assign(service, updateDto);

  await this.serviceRepository.save(service);
  return this.findOne(id);
}

  async remove(id: number): Promise<void> {
    const service = await this.serviceRepository.findOne({
      where: { id },
      relations: ['rates'],
    });

    if (!service) {
      throw new BadRequestException('Servicio no encontrado');
    }

    if (service.rates && service.rates.length > 0) {
      throw new BadRequestException('No se puede eliminar: la entidad tiene registros dependientes.');
    }

    await this.serviceRepository.delete(id);
  }
}
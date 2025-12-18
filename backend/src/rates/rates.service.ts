import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rate } from './entities/rate.entity';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';

@Injectable()
export class RatesService {
  constructor(
    @InjectRepository(Rate)
    private rateRepository: Repository<Rate>,
  ) {}

    async create(createRateDto: CreateRateDto): Promise<Rate> {
      const { startDate, endDate, serviceId } = createRateDto;

      if (new Date(startDate) > new Date(endDate)) {
        throw new BadRequestException('La fecha de inicio no puede ser posterior a la fecha de fin.');
      }

      // usar objeto anidado para relación
      const existingRate = await this.rateRepository.findOne({
        where: {
          service: { id: serviceId }, // <-- Así se filtra por relación
          startDate,
          endDate,
        },
      });

      if (existingRate) {
        throw new BadRequestException('Ya existe un tarifario con el mismo rango de fechas para este servicio..');
      }

      const rate = this.rateRepository.create(createRateDto);
      return this.rateRepository.save(rate);
    }

  findAll(): Promise<Rate[]> {
    return this.rateRepository.find({ relations: ['service'] });
  }

  async findOne(id: number): Promise<Rate> {
    const rate = await this.rateRepository.findOne({ 
      where: { id }, 
      relations: ['service'] 
    });
    if (!rate) {
      throw new BadRequestException('Tarifario no encontrado');
    }
    return rate;
  }

  async update(id: number, updateDto: UpdateRateDto): Promise<Rate> {
    // Validar fechas si se actualizan
    if (updateDto.startDate || updateDto.endDate) {
      const current = await this.findOne(id);
      const newStart = updateDto.startDate || current.startDate;
      const newEnd = updateDto.endDate || current.endDate;
      if (new Date(newStart) > new Date(newEnd)) {
        throw new BadRequestException('La fecha de inicio no puede ser posterior a la fecha de fin.');
      }
    }
    await this.rateRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const rate = await this.findOne(id);
    await this.rateRepository.delete(id);
  }
  getRatesByService(serviceId: number): Promise<Rate[]> {
  return this.rateRepository.find({
    where: { serviceId }, 
  });
}

}
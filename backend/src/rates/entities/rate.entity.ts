
// src/rates/entities/rate.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsNumber, IsDateString, IsString, Min } from 'class-validator';
import { Service } from '../../services/entities/service.entity';

@Entity('rates')
export class Rate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  @Min(0)
  price: number;

  @Column()
  @IsDateString()
  startDate: string;

  @Column()
  @IsDateString()
  endDate: string;

  @Column()
  @IsString()
  currency: string;

  @Column()
  serviceId: number;

  @ManyToOne(() => Service, service => service.rates)
  service: Service;
}
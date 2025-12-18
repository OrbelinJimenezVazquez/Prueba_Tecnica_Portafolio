// src/services/entities/service.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { IsString, IsBoolean } from 'class-validator';
import { Provider } from '../../providers/entities/provider.entity';
import { Rate } from '../../rates/entities/rate.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsBoolean()
  isActive: boolean;

  @Column({ nullable: false })
  providerId: number;

  @ManyToOne(() => Provider, provider => provider.services)
  provider: Provider;

  @OneToMany(() => Rate, rate => rate.service)
  rates: Rate[];
}
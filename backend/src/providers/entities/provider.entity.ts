// src/providers/entities/provider.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { IsString, IsEmail, IsBoolean, Length } from 'class-validator';
import { Service } from '../../services/entities/service.entity';

@Entity('providers')
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(1, 35)
  name: string;

  @Column()
  @IsEmail()
  contactEmail: string;

  @Column()
  @IsString()
  phone: string;

  @Column({ default: true })
  @IsBoolean()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Service, service => service.provider)
  services: Service[];
  
}
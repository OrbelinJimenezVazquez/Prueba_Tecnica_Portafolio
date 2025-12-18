// src/rates/dto/create-rate.dto.ts
import { IsNumber, IsDateString, IsString, Min, IsInt, MinDate } from 'class-validator';

export class CreateRateDto {
  @IsNumber()
  @Min(0)
  price: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  currency: string;

  @IsInt()
  @Min(1)
  serviceId: number; // FK
}
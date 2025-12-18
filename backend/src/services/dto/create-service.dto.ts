// src/services/dto/create-service.dto.ts
import { IsString, IsBoolean, IsInt, Min } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  isActive: boolean;

  @IsInt()
  @Min(1)
  providerId: number; // FK
}
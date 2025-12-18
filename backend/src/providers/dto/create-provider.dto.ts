// src/providers/dto/create-provider.dto.ts
import { IsString, IsEmail, IsBoolean, Length, IsOptional } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsEmail()
  contactEmail: string;

  @IsString()
  phone: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}
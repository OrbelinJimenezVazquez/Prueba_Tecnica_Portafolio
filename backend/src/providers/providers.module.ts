// src/providers/providers.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Service } from '../services/entities/service.entity'; // ← Servicio Agregado
import { ProvidersController } from './providers.controller';
import { ProvidersService } from './providers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Provider, Service]), // ← Agregamos Servicce y provider aquí
  ],
  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}
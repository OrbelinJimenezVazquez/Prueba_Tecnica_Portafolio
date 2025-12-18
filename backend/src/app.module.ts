// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './providers/entities/provider.entity';
import { Service } from './services/entities/service.entity';
import { Rate } from './rates/entities/rate.entity';
import { ProvidersModule } from './providers/providers.module';
import { ServicesModule } from './services/services.module';
import { RatesModule } from './rates/rates.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root', // CONTRASEÑA
      database: 'prueba_proveedores', // Esta es nuestra base de datos
      synchronize: true,
      logging: false,
      entities: [Provider, Service, Rate],
    }),
    ProvidersModule,
    ServicesModule,
    RatesModule,
  ],
})
export class AppModule {}
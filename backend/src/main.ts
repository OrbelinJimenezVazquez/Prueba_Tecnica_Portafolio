// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 👇 Habilitar CORS (esto es obligatorio para desarrollo local)
  app.enableCors({
    origin: 'http://localhost:4200', // Solo permite tu frontend
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { logInterpector } from './interpectors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  // app.useGlobalInterceptors(new logInterpector())

  await app.listen(3000);
}
bootstrap();

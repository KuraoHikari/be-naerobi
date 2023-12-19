import '@wahyubucil/nestjs-zod-openapi/boot';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { patchNestjsSwagger } from '@wahyubucil/nestjs-zod-openapi';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Example API')
    .setDescription('The example API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  patchNestjsSwagger({ schemasSort: 'alpha' });
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(8000);
}
bootstrap();

import '@wahyubucil/nestjs-zod-openapi/boot';

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { patchNestjsSwagger } from '@wahyubucil/nestjs-zod-openapi';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Example API')
    .setDescription('The example API description')
    .setVersion('1.0')
    .build();

  patchNestjsSwagger({ schemasSort: 'alpha' }); // <-- add this. This function should run before the `SwaggerModule.createDocument` function.

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();

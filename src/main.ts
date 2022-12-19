import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { Transport } from '@nestjs/microservices';
import { INestMicroservice } from '@nestjs/common';
import { protobufPackage } from './email/proto/email.pb';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50055',
        package: protobufPackage,
        protoPath: join('node_modules/proto-config/proto/email.proto'),
      },
    },
  );
  await app.listen();
}
bootstrap();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    EmailModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: `${process.env.EMAIL_HOST}`,
        port: Number(process.env.EMAIL_PORT),
        secure: true,
        auth: {
          user: `${process.env.EMAIL_USER}`,
          pass: `${process.env.EMAIL_PASS}`,
        },
      },
      defaults: {
        from: '\'"No Reply" <sopriko.daniil@gmail.com>\'',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [EmailModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}

import { Controller, Inject } from '@nestjs/common';
import { EmailService } from './email.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AccountConfirmResponse,
  EMAIL_SERVICE_NAME,
  PasswordRestoreResponse,
} from './proto/email.pb';

@Controller('email')
export class EmailController {
  @Inject(EmailService)
  private readonly service: EmailService;

  @GrpcMethod(EMAIL_SERVICE_NAME, 'PasswordRestore')
  private async passwordRestore(payload): Promise<PasswordRestoreResponse> {
    return this.service.passwordRestore(payload);
  }

  @GrpcMethod(EMAIL_SERVICE_NAME, 'AccountConfirm')
  private async accountConfirm(payload): Promise<AccountConfirmResponse> {
    return this.service.accountConfirm(payload);
  }
}

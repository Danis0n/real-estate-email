import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { MailerService } from '@nestjs-modules/mailer';
import {
  AccountConfirmRequest,
  AccountConfirmResponse,
  PasswordRestoreRequest,
  PasswordRestoreResponse,
} from './proto/email.pb';

@Injectable()
export class EmailService {
  @Inject(MailerService)
  private readonly mailService: MailerService;

  public async passwordRestore(
    dto: PasswordRestoreRequest,
  ): Promise<PasswordRestoreResponse> {
    const link = `http://localhost:3000/auth/restore/${dto.token}`;
    await this.mailService.sendMail({
      to: dto.email,
      subject: 'Restore your password',
      text: link,
    });
    return { error: null, status: HttpStatus.OK };
  }

  public async accountConfirm(
    dto: AccountConfirmRequest,
  ): Promise<AccountConfirmResponse> {
    const link = `http://localhost:3000/auth/confirm/${dto.token}`;
    await this.mailService.sendMail({
      to: dto.email,
      subject: 'Confirm your account',
      text: link,
    });
    return { error: null, status: HttpStatus.OK };
  }
}

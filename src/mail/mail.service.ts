import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmEmail(email: string, url: string) {
    const response = `example.com/auth/confirm?token=${url}`;

    console.log({ url });
    await this.mailerService.sendMail({
      to: email,
      from: 'noreply@nestjs.com',

      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirm-email',
      context: {
        url,
      },
    });
  }
}

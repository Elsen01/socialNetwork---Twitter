import { Body, Controller, Post } from '@nestjs/common';
import { ConfirmEmailDto } from './dto/email-confirm.dto';
import { EmailConfirmService } from './email-confirm.service';

@Controller('email-confirmation')
export class EmailConfirmController {
  constructor(private readonly emailConfirmService: EmailConfirmService) {}

  @Post('confirm')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.emailConfirmService.decodeConfirmationToken(
      confirmationData.token,
    );
    return await this.emailConfirmService.confirmEmail(email);
  }
}

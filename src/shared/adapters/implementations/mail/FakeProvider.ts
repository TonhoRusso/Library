import { IMailMessage, IMailProvider } from '../../models/MailProvider';

export class FakeProvider implements IMailProvider {
  async sendEmail(
    message: IMailMessage,
    meta?: Record<string, unknown>
  ): Promise<void> {
    console.log('sending mail', {
      message: message.subject,
      recipient: message.to.email,
      body: message.body,
    });
  }
}

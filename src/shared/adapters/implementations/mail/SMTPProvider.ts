import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider, IMailMessage } from '../../models/MailProvider';

export class SMTPProvider implements IMailProvider {
  private transporter: Transporter;

  constructor(mailConfig: object) {
    this.transporter = nodemailer.createTransport(mailConfig);
  }

  async sendEmail(message: IMailMessage): Promise<void> {
    await this.transporter.sendMail({
      from: {
        name: String(message.from.name),
        address: message.from.email,
      },
      to: {
        name: String(message.to.name),
        address: message.to.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}

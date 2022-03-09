export interface IMailAddress {
  name?: string;
  email: string;
}

export interface IMailMessage {
  from: IMailAddress;
  to: IMailAddress;
  subject: string;
  body: string;
}

export interface IMailProvider {
  sendEmail(
    message: IMailMessage,
    meta?: Record<string, unknown>
  ): Promise<void>;
}

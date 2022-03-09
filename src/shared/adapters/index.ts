import { container } from 'tsyringe';

import { mailConfig } from '@config/mail';

import { IMailProvider } from './models/MailProvider';
import { providers } from './providers';

const Mail = providers.mail[mailConfig.driver];

container.registerInstance<IMailProvider>(
  'MailProvider',
  new Mail(mailConfig.config[mailConfig.driver])
);

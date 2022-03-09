import { FakeProvider } from './implementations/mail/FakeProvider';
import { SMTPProvider } from './implementations/mail/SMTPProvider';

export const providers = {
  mail: {
    smtp: SMTPProvider,
    fake: FakeProvider,
  },
};

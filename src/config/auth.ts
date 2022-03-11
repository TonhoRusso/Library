const authConfig = Object.freeze({
  jwtToken: '' + process.env.jwtToken || '',
  expires_in_token: process.env.EXPIRES_IN_TOKEN || '15m',
});

export { authConfig };

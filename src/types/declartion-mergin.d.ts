export type EnvVariables = {
  PORT: string;
  NODE_ENV: 'development' | 'production';
  DATABASE_URL: string;
  REDIS_URL: string;
  OTP_SECRET: string;
};

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends EnvVariables {}
  }
}

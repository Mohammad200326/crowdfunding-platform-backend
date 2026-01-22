export type EnvVariables = {
  PORT: string;
  NODE_ENV: 'development' | 'production';
  DATABASE_URL: string;
  REDIS_URL: string;
  OTP_SECRET: string;
  IMAGEKIT_SECRET_KEY: string;
};

declare global {
  namespace Express {
    namespace Multer {
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      interface File extends ImageKit.Files.FileUploadResponse {
        fileId?: string;
        url?: string;
      }
    }
    // interface Request {
    //   user?: UserResponseDTO['user'];
    // }
  }
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends EnvVariables {}
  }
}

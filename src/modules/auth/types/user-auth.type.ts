import { UserRole } from '@prisma/client';

export type Token_Payload = {
  sub: string;
  role: UserRole;
};

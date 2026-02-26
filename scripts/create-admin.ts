import 'dotenv/config';
import * as argon from 'argon2';
import { UserRole } from '@prisma/client';
import { DatabaseService } from '../src/modules/database/database.service';

async function run() {
  const prisma = new DatabaseService();
  await prisma.$connect();

  const email = 'admin@gmail.com';
  const password = 'admin123';

  if (!email || !password) {
    throw new Error('Missing EMAIL or PASSWORD');
  }

  const hashed = await argon.hash(password);

  await prisma.user.upsert({
    where: { email },
    update: { role: UserRole.ADMIN },
    create: {
      email,
      password: hashed,
      firstName: 'Admin',
      lastName: 'System',
      role: UserRole.ADMIN,
      country: 'EG',
    },
  });

  await prisma.$disconnect();
  console.log('Admin ensured');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

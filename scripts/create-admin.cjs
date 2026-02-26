require('dotenv').config();

const argon = require('argon2');
const { PrismaClient, UserRole } = require('@prisma/client');

async function run() {
  // شغله مرة واحدة (اختياري) — إذا مش حاطط المتغير رح يتخطى
  if (process.env.ADMIN_SEED_ENABLED !== 'true') {
    console.log('Admin seed skipped');
    return;
  }

  const email = (process.env.ADMIN_EMAIL || 'admin@gmail.com').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  if (!email || !password) throw new Error('Missing EMAIL or PASSWORD');

  // مهم: datasourceUrl عشان يضمن Railway DATABASE_URL
  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  });

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
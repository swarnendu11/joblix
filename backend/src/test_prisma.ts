import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
p.$connect()
  .then(() => {
    process.exit(0);
  })
  .catch(e => {
    console.error('Connection failed:', e);
    process.exit(1);
  });

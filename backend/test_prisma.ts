import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
console.log('Testing Prisma connection...');
p.$connect()
  .then(() => {
    console.log('Connected successfully!');
    process.exit(0);
  })
  .catch(e => {
    console.error('Connection failed:', e);
    process.exit(1);
  });

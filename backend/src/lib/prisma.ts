import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: any;
};

// Lazy initialization of Prisma to prevent top-level crashes
const getPrisma = () => {
    if (globalForPrisma.prisma) return globalForPrisma.prisma;

    try {
        const client = new PrismaClient();
        globalForPrisma.prisma = client;
        return client;
    } catch (error) {
        console.error('Prisma failed. Using mock.');
        return generateMockPrisma();
    }
};

const generateMockPrisma = () => {
  return {
    user: {
      findUnique: async (args: any) => ({ id: 1, clerkId: args.where.clerkId, email: 'user@example.com', plan: 'FREE' }),
      upsert: async (args: any) => ({ id: 1, clerkId: args.where.clerkId, email: args.create.email, plan: 'FREE' }),
      update: async (args: any) => ({ id: 1, ...args.data }),
      count: async () => 0,
    },
    resume: {
      findMany: async () => [],
      findFirst: async () => null,
      create: async (args: any) => ({ id: Math.floor(Math.random() * 1000), ...args.data }),
      update: async (args: any) => ({ id: 1, ...args.data }),
      delete: async () => ({}),
      count: async () => 0,
    },
    $connect: async () => {},
    $disconnect: async () => {},
  };
};

const prismaProxy = new Proxy({} as any, {
    get: (target, prop) => {
        const p = getPrisma();
        return (p as any)[prop];
    }
});

export default prismaProxy;

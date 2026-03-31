"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const globalForPrisma = globalThis;
// Lazy initialization of Prisma to prevent top-level crashes
const getPrisma = () => {
    if (globalForPrisma.prisma)
        return globalForPrisma.prisma;
    try {
        const client = new client_1.PrismaClient();
        globalForPrisma.prisma = client;
        return client;
    }
    catch (error) {
        console.error('Prisma failed. Using mock.');
        return generateMockPrisma();
    }
};
const generateMockPrisma = () => {
    return {
        user: {
            findUnique: async (args) => ({ id: 1, clerkId: args.where.clerkId, email: 'user@example.com', plan: 'FREE' }),
            upsert: async (args) => ({ id: 1, clerkId: args.where.clerkId, email: args.create.email, plan: 'FREE' }),
            update: async (args) => ({ id: 1, ...args.data }),
            count: async () => 0,
        },
        resume: {
            findMany: async () => [],
            findFirst: async () => null,
            create: async (args) => ({ id: Math.floor(Math.random() * 1000), ...args.data }),
            update: async (args) => ({ id: 1, ...args.data }),
            delete: async () => ({}),
            count: async () => 0,
        },
        $connect: async () => { },
        $disconnect: async () => { },
    };
};
const prismaProxy = new Proxy({}, {
    get: (target, prop) => {
        const p = getPrisma();
        return p[prop];
    }
});
exports.default = prismaProxy;

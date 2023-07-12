import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
const default_roles = ['USER', 'ACTIVATED_USER', 'ADMIN'];

async function main() {
    for (const role of default_roles) {
        await prisma.roleSchema.upsert({ where: { value: role }, update: {} ,create: { value: role } });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const existingAdmin = await prisma.user.findUnique({
        where: { email: "admin@synergy.com" },
    });

    if (existingAdmin) {
        console.log("Admin user already exists. Overwriting password to make sure...");
        const hashedPassword = await bcrypt.hash("SynergyAdmin123!", 10);
        await prisma.user.update({
            where: { email: "admin@synergy.com" },
            data: { password: hashedPassword },
        });
        console.log("Admin password reset.");
    } else {
        const hashedPassword = await bcrypt.hash("SynergyAdmin123!", 10);
        const newAdmin = await prisma.user.create({
            data: {
                name: "Synergy Admin",
                email: "admin@synergy.com",
                password: hashedPassword,
            },
        });
        console.log("SUCCESS! Admin user successfully created locally:", newAdmin.email);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

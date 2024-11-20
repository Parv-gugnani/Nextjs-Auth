import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const newUser = await prisma.user.create({
        data: {
          email: "testuser@example.com",
          password: "hashedpassword123",
          createdAt: new Date(),
        },
      });

  console.log("New User:", newUser);

  const users = await prisma.user.findMany();
  console.log("All Users:", users);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
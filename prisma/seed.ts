import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.create({
    data: {
      username: "testuser",
      email: "testuser@example.com",
      password: hashedPassword,
      posts: {
        create: [
          { title: "First Post", content: "This is my first post!" },
          { title: "Second Post", content: "Another post for testing." },
        ],
      },
    },
  });

  console.log("User created:", user);
}

main()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });

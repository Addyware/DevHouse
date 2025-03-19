<<<<<<< HEAD
import { User } from "@prisma/client";
import { db } from "../../../database/client";
=======
import { PrismaClient } from "@prisma/client";
import { IUser } from "../../../shared/dtos";
>>>>>>> sprint2-authservice
import { IAuthService } from "../../../shared/interfaces";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10");

export class AuthService implements IAuthService {
<<<<<<< HEAD
  async createUser(user: User): Promise<User> {
    /*
     maybe look at or...
     const userExists = await db.user.findMany({
      where: {
        OR: [{ email: user.email }, { username: user.username }],
      },
    });
    */
    const userWithSameEmailExists = await db.user.findUnique({
      where: { email: user.email },
    });

    const userWithSameUsernameExists = await db.user.findFirst({
      where: { username: user.username },
    });

    if (userWithSameUsernameExists || userWithSameEmailExists) {
      throw new Error(
        "That email/username has already been taken. Please try another one."
      );
    } else {
      const createdUser = await db.user.create({ data: user });
      return createdUser;
    }
  }

  async loginUser(user: User): Promise<User> {
    const foundUser = await db.user.findUnique({
      where: { email: user.email, password: user.password },
    });
    if (!foundUser) throw new Error("User not found");
    return foundUser;
  }
=======
    // Register user with Prisma
    async createUser(user: IUser): Promise<IUser> {
        const email = user.email.toLowerCase();

        // Check if user already exists
        const existingUser = await this.findUserByEmail(email);
        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        // Hash the password before storing
        const hashedPassword = await this.hashPassword(user.password);
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
                posts: { create: [] }, // Empty posts array for now
            },
        });

        return newUser as IUser;
    }

    // Login, verify user + check hashed password
    async loginUser({ email, password }: IUser): Promise<IUser> {
        const foundUser = await this.findUserByEmail(email);
        if (!foundUser) {
            throw new Error("Invalid email or password");
        }

        // Compare password with stored hashed password
        const isMatch = await this.comparePasswords(password, foundUser.password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        return foundUser;
    }

    // Find user by email using Prisma
    public async findUserByEmail(email: string): Promise<IUser | undefined> {
        try {
            const searchedUser = await prisma.user.findUnique({
                where: { email },
            });

            return searchedUser as IUser | undefined;
        } catch (error) {
            throw new Error(`Error finding user by email: ${error}`);
        }
    }

    // Hash password
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, SALT_ROUNDS);
    }

    // Compare passwords
    async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
>>>>>>> sprint2-authservice
}

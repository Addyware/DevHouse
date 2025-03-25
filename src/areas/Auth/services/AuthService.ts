import { db } from "../../../database/client";
import { IUser } from "../../../shared/dtos";
import { IAuthService } from "../../../shared/interfaces";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10");

export class AuthService implements IAuthService {
  async createUser(user: IUser): Promise<IUser> {
    const userWithSameEmailExists = await db.user.findUnique({
      where: { email: user.email },
    });

    const userWithSameUsernameExists = await db.user.findFirst({
      where: { username: user.username },
    });

    if (userWithSameUsernameExists || userWithSameEmailExists) {
      throw new Error("That email/username has already been taken. Please try another one.");
    }

    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);

    const createdUser = await db.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: hashedPassword,
      },
    });

    return createdUser;
  }

  async loginUser(user: IUser): Promise<IUser> {
    const foundUser = await db.user.findUnique({
      where: { email: user.email },
    });

    if (!foundUser) throw new Error("Invalid Login Credentials");

    const isValid = await bcrypt.compare(user.password, foundUser.password);
    if (!isValid) throw new Error("Invalid Login Credentials");

    return foundUser;
  }

  async updateUserProfile(
    userId: number,
    updates: { email?: string; username?: string; password?: string }
  ): Promise<IUser> {
    const data: Partial<IUser> = {};

    if (updates.email) {
      const existingEmail = await db.user.findFirst({
        where: { email: updates.email, NOT: { id: userId } },
      });
      if (existingEmail) throw new Error("Email already in use");
      data.email = updates.email;
    }

    if (updates.username) {
      const existingUsername = await db.user.findFirst({
        where: { username: updates.username, NOT: { id: userId } },
      });
      if (existingUsername) throw new Error("Username already taken");
      data.username = updates.username;
    }

    if (updates.password) {
      data.password = await bcrypt.hash(updates.password, SALT_ROUNDS);
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data,
    });

    return updatedUser;
  }
}

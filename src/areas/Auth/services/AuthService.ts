import { User } from "@prisma/client";
import { db } from "../../../database/client";
import bcrypt from "bcrypt";
import { IAuthService } from "../../../shared/interfaces"; 

export class AuthService implements IAuthService {
  async createUser(user: User): Promise<User> {
    const userExists = await db.user.findUnique({
      where: { email: user.email },
    });

    if (!userExists) {
      const createdUser = await db.user.create({ data: user });
      return createdUser;
    } else {
      throw new Error(
        "That email has already been taken. Please try another one."
      );
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createdUser = await db.user.create({
      data: { ...user, password: hashedPassword },
    });

    return createdUser;
  }

  async loginUser(user: { email: string; password: string }): Promise<User> {
    const foundUser = await db.user.findUnique({
      where: { email: user.email },
    });

    if (!foundUser) {
      throw new Error("Invalid email or password.");
    }

    const isPasswordValid = await bcrypt.compare(user.password, foundUser.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }

    return foundUser;
  }
} 
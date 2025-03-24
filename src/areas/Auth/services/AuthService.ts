import { User } from "@prisma/client";
import { db } from "../../../database/client";
import { IAuthService } from "../../../shared/interfaces";

export class AuthService implements IAuthService {
  async createUser(user: User): Promise<User> {
    /*
     maybe look at or...
     const userExists = await db.user.findMany({
      where: {
        OR: [{ email: user.email }, { username: user.username }],
      },
    });
    */
    try {
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
    } catch (error) {
      console.log("error");
      console.log(user);
      return user;
    }
  }

  async loginUser(user: User): Promise<User> {
    const foundUser = await db.user.findUnique({
      where: { email: user.email, password: user.password },
    });
    if (!foundUser) throw new Error("User not found");
    return foundUser;
  }
}

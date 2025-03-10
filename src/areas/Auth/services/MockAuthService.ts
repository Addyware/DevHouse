import { db } from "../../../database/fakeDB";
import { IUser } from "../../../shared/dtos";
import { IAuthService } from "../../../shared/interfaces";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10"); // Get from .env or do 10

export class MockAuthService implements IAuthService {
  // Register with hashed password
  async createUser(user: IUser): Promise<IUser> {
    const newUser = { 
      id: Date.now(), 
      posts: [], 
      ...user 
    };

    // hash password before storing
    newUser.password = await bcrypt.hash(newUser.password, SALT_ROUNDS);

    db.push(newUser);
    return newUser;
  }

  // Login: Verify user + check hashed password
  async loginUser({ email, password }: IUser): Promise<IUser> {
    const foundUser = await this.findUserByEmail(email);
    if (!foundUser) throw new Error("User not found");

    //compare password with stored hashed password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return foundUser;
  }

  private async findUserByEmail(email: string): Promise<IUser | undefined> {
    return db.find((user) => user.email === email);
  }
}

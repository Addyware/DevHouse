import { db } from "../../../database/fakeDB";
import { IUser } from "../../../shared/dtos";
import { IAuthService } from "../../../shared/interfaces";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10");

export class MockAuthService implements IAuthService {
  // Register user with HASHED password
  async createUser(user: IUser): Promise<IUser> {
    const email = user.email.toLowerCase();
    
    // Check if user already exists
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    const newUser = {
      id: Date.now(),
      posts: [],
      email,
      password: hashedPassword,
    };

    db.push(newUser);
    return newUser;
  }

  // Login, verify user + check hashed password
  async loginUser({ email, password }: IUser): Promise<IUser> {
    const foundUser = await this.findUserByEmail(email);
    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    // Compare password with stored hashed password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    return foundUser;
  }

  // Find user by email
  public async findUserByEmail(email: string): Promise<IUser | undefined> {
    return db.find((user) => user.email.toLowerCase() === email.toLowerCase());
  }
}

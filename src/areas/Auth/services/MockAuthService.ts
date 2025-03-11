import { db } from "../../../database/fakeDB";
import { IUser } from "../../../shared/dtos";
import { IAuthService } from "../../../shared/interfaces";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10"); // Default to 10 if not set

export class MockAuthService implements IAuthService {
  // Register user with hashed password
  async createUser(user: IUser): Promise<IUser> {
    const email = user.email.toLowerCase();

    // Check if user already exists
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    console.log(`🔹 [REGISTER] Raw Password: ${user.password}`); // Log before hashing

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);

    console.log(`✅ [REGISTER] Hashed Password: ${hashedPassword}`); // Log after hashing

    const newUser = {
      id: Date.now(),
      posts: [],
      email,
      password: hashedPassword,
    };

    db.push(newUser);
    return newUser;
  }

  // Login: Verify user + check hashed password
  async loginUser({ email, password }: IUser): Promise<IUser> {
    const foundUser = await this.findUserByEmail(email);
    if (!foundUser) {
      console.error(`❌ [LOGIN] Failed: User not found (${email})`);
      throw new Error("Invalid email or password");
    }

    console.log(`🔹 [LOGIN] Entered Password: ${password}`); // Log entered password
    console.log(`🔹 [LOGIN] Stored Hashed Password: ${foundUser.password}`); // Log stored hash

    // Compare input password with stored hashed password
    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      console.error(`❌ [LOGIN] Failed: Incorrect password for (${email})`);
      throw new Error("Invalid email or password");
    }

    console.log(`✅ [LOGIN] Password matched for (${email})`);
    return foundUser;
  }

  // Find user by email (case-insensitive)
  private async findUserByEmail(email: string): Promise<IUser | undefined> {
    return db.find((user) => user.email.toLowerCase() === email.toLowerCase());
  }
}

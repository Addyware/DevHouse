import { db } from "../../../database/fakeDB";
import { IUser } from "../../../shared/dtos";
import { IAuthService } from "../../../shared/interfaces";

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "10");
export class MockAuthService implements IAuthService {
  async findUserByEmail(email: string): Promise<IUser | undefined> {
    return db.find((user)=> user.email === email)
  }

  private async findUserByEmailAndPassword(
    email: string,
    password: string
  ): Promise<IUser | undefined> {
    return db.find(
      (user) => user.email === email && user.password === password
    );
  }
  async createUser(user: IUser): Promise<IUser> {
    const email = user.email.toLowerCase();
    // Check if user already exists
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // HASH BEFORE STORING!!!!!!!
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

  async loginUser({ email, password }: IUser): Promise<IUser> {
    console.log("entered");
    const foundUser = await this.findUserByEmailAndPassword(email, password);
    console.log(foundUser);
    if (!foundUser) throw new Error("User not found");
    return foundUser;
  }

  // Find user by email
  private async findUserByEmail(email: string): Promise<IUser | undefined> {
    return db.find((user) => user.email.toLowerCase() === email.toLowerCase());
  }
}

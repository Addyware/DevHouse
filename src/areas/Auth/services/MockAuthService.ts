import { db } from "../../../database/fakeDB";
import { IUser } from "../../../shared/dtos";
import { IAuthService } from "../../../shared/interfaces";

<<<<<<< HEAD
export class MockAuthService implements IAuthService {
  private async findUserByEmailAndPassword(
    email: string,
    password: string
  ): Promise<IUser | undefined> {
    return db.find(
      (user) => user.email === email && user.password === password
    );
  }
  async createUser(user: IUser): Promise<IUser> {
    const newUser = { id: Date.now(), posts: [], ...user };
=======
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

>>>>>>> sprint2-authservice
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
<<<<<<< HEAD
=======

  // Find user by email
  public async findUserByEmail(email: string): Promise<IUser | undefined> {
    return db.find((user) => user.email.toLowerCase() === email.toLowerCase());
  }
>>>>>>> sprint2-authservice
}

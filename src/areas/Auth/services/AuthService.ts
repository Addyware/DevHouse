import { promise } from "zod";
import { db } from "../../../database/fakeDB";
import { IUser } from "../../../shared/dtos";
import { IAuthService } from "../../../shared/interfaces";

export class AuthService implements IAuthService {
  async findUserByEmail(email: string): Promise<IUser | undefined> {
    return db.find((user) => user.email === email);
  }
  
  async findUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    const user = db.find((user) => user.email === email && user.password === password);
    if (!user) {
      return Promise.reject(new Error("User not found"));
    }
    return Promise.resolve(user);
  }
  async createUser(user: IUser): Promise<IUser> {
    const existingUser = await this.findUserByEmail(user.email);

    if (existingUser){
      throw new Error(`User with email ${user.email} already exists`)
    }
    const newUser: IUser = {
      id: db.length + 1,
      email: user.email,
      password: user.password,
    };
    db.push(newUser);
    return newUser
  }

  async loginUser(user: IUser): Promise<IUser> {
    return await this.findUserByEmailAndPassword(user.email, user.password);
  }
}

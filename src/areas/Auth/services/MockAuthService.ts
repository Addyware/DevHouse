import { db } from "../../../database/fakeDB";
import { IUser } from "../../../shared/dtos";
import { IAuthService } from "../../../shared/interfaces";

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
    db.push(newUser);
    return newUser;
  }

  async loginUser({ email, password }: IUser): Promise<IUser> {
    const foundUser = await this.findUserByEmailAndPassword(email, password);
    if (!foundUser) throw new Error("User not found");
    return foundUser;
  }
}

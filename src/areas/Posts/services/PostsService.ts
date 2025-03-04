import { db } from "../../../database/fakeDB";
import { IUser } from "../../../shared/dtos";
import { IAuthService } from "../../../shared/interfaces";

export class PostsService implements IAuthService {
  findUserByEmail(email: String): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  findUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  createUser(user: IUser): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  loginUser(user: IUser): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
}

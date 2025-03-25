import { IPost, IUser, PostCreate, PostDelete } from "./dtos";

export interface IController {
  path: string;
  router: any; // TODO: DELETE THIS (NO LONGER NECESSARY)
}

export interface IAuthService {
  createUser(user: IUser): Promise<IUser>;
  loginUser(user: IUser): Promise<IUser>;

  // user profile method for Sprint 3
  updateUserProfile(
    userId: number,
    updates: { email?: string; username?: string; password?: string }
  ): Promise<IUser>;
}

export interface IPostsService {
  createPost(post: PostCreate, userId: number): Promise<IPost>;
  deletePost(postId: PostDelete): Promise<void>;
  getPosts(): Promise<IPost[]>;
}

import { Hono } from "hono";
import { IPost, IUser, PostCreate, PostDelete, postDeleteSchema } from "./dtos";

export interface IController {
  path: string;
  router: Hono;
}

export interface IAuthService {
  createUser(user: IUser): Promise<IUser>;
  loginUser(user: IUser): Promise<IUser>;
}

export interface IPostsService {
  createPost(post: PostCreate, userId: number): Promise<IPost>;
  deletePost(postId: PostDelete): Promise<void>;
  getPosts(): Promise<IPost[]>;
}

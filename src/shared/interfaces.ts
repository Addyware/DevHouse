import { PostAndUser } from "@/areas/Posts/services/PostsService";
import { Post, User } from "@prisma/client";
import {
  PostCreate,
  PostDelete,
  userLoginType,
  userRegisterType,
} from "./dtos";

export interface IController {
  path: string;
  router: any; // TODO: DELETE THIS (NO LONGER NECESSARY)
}

export interface IAuthService {
  createUser(user: userRegisterType): Promise<User>;
  loginUser(user: userLoginType): Promise<User>;
}

export interface IPostsService {
  createPost(post: PostCreate, userId: number): Promise<Post>;
  deletePost(postId: PostDelete): Promise<void>;
  getPosts(): Promise<PostAndUser[]>;
}

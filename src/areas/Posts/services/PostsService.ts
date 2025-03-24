import { PostCreate, PostDelete } from "@/shared/dtos";
import { Post } from "@prisma/client";
import { db } from "../../../database/client";
import { IPostsService } from "../../../shared/interfaces";

export type PostAndUser = {
  user: {
    id: number;
    email: string;
    password: string;
    username: string;
    avatar: string | null;
  };
} & {
  id: number;
  content: string;
  userId: number;
};
export class PostsService implements IPostsService {
  async createPost(post: PostCreate, userId: number): Promise<Post> {
    throw new Error("Method not implemented.");
  }
  async deletePost(postId: PostDelete): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getPosts(): Promise<PostAndUser[]> {
    // JOIN
    const posts = await db.post.findMany({
      include: { user: true },
    });
    return posts;
  }
}

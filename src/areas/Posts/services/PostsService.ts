import { db } from "../../../database/client";
import { IPostsService } from "../../../shared/interfaces";
import { IPost, PostCreate, PostDelete } from "../../../shared/dtos";

export class PostsService implements IPostsService {
  async getPosts(): Promise<IPost[]> {
    return await db.post.findMany({
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });
  }

  // Optional: stubbed but not implemented yet
  async createPost(post: PostCreate, userId: number): Promise<IPost> {
    throw new Error("createPost not implemented yet.");
  }

  async deletePost({ id }: PostDelete): Promise<void> {
    throw new Error("deletePost not implemented yet.");
  }
}


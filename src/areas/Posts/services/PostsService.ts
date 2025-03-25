import { db } from "../../../database/client";
import { IPostsService } from "../../../shared/interfaces";
import { IPost, PostCreate, PostDelete } from "../../../shared/dtos";

type RawPostWithUser = {
  id: number;
  text: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user?: {
    username: string;
  };
};

export class PostsService implements IPostsService {
  async createPost(post: PostCreate, userId: number): Promise<IPost> {
    const newPost = await db.post.create({
      data: {
        text: post.text,
        code: post.code ?? "", // ✅ No error here
        userId,
      },
    });

    return {
      ...newPost,
      author: "Anonymous", // You can update this if real user info is needed
      liked: false,
      likes: 0,
    };
  }

  async deletePost(postId: PostDelete): Promise<void> {
    await db.post.delete({ where: { id: postId.id } });
  }

  async getPosts(): Promise<IPost[]> {
    const posts = await db.post.findMany({
      include: {
        user: true,
      },
    });

    return posts.map((post: RawPostWithUser): IPost => ({
      ...post,
      author: post.user?.username || "Unknown",
      liked: false,
      likes: 0,
    }));
  }
}

import { db, postsDb } from "../../../database/fakeDB";
import { IPost, PostCreate, PostDelete } from "../../../shared/dtos";
import { IPostsService } from "../../../shared/interfaces";

export class MockPostsService implements IPostsService {
  async deletePost({ id }: PostDelete): Promise<void> {
    const foundPost = postsDb.findIndex((post) => post.id === id);
    if (!foundPost) throw new Error("Post not found");
    postsDb.splice(foundPost, 1);
  }
  private async findPostById(id: number): Promise<IPost | undefined> {
    return postsDb.find((post) => post.id === id);
  }

  async createPost(post: PostCreate, userId: number): Promise<IPost> {
    const newPost: IPost = { id: Date.now(), userId, ...post };
    postsDb.push(newPost);
    return newPost;
  }

  async getPosts(): Promise<IPost[]> {
    return postsDb;
  }
}

import { z } from "zod";

// Define User Schema
export const UserDTO = z.object({
  id: z.number().optional(),
  email: z.string().email(),
  username: z.string().min(1, "Username must be at least 1 character"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const PostSchema = z.object({
  id: z.number().optional(),
  text: z.string().min(1), // min(1) disallows empty strings
  code: z.string().min(1).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  userId: z.number().optional(),
  avatar: z.string().optional(),
  author: z.string().optional(),
  liked: z.boolean().optional(),
  likes: z.number().optional(),
});

export const PostsSchema = z.array(PostSchema);

// Fixed PostCreate schema by adding optional 'code'
export const postCreateSchema = z.object({
  text: z.string(),
  code: z.string().optional(), // here it is
});

export const postUpdateSchema = z.object({
  id: z.number(),
  text: z.string(),
});

export const postDeleteSchema = z.object({
  id: z.number(),
});

export type IUser = z.infer<typeof UserDTO>;
export type IPost = z.infer<typeof PostSchema>;
export type TPosts = z.TypeOf<typeof PostsSchema>;
export type TPost = z.TypeOf<typeof PostSchema>;
export type PostUpdate = z.TypeOf<typeof postUpdateSchema>;
export type PostDelete = z.TypeOf<typeof postDeleteSchema>;
export type PostCreate = z.TypeOf<typeof postCreateSchema>;

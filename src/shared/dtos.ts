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

// ✅ Add LoginDTO to allow login with username, email, and password
export const LoginDTO = z.object({
  email: z.string().email(),
  username: z.string().min(1, "Username is required"), // required for Option 2
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Unified Post Schema: aligns with Prisma and frontend
export const PostSchema = z.object({
  id: z.number().optional(),
  text: z.string().min(1), // what frontend uses
  content: z.string().optional(), // what DB returns
  code: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  userId: z.number().optional(),
  avatar: z.string().optional(),
  author: z.string().optional(),
  liked: z.boolean().optional(),
  likes: z.number().optional(),
});

export const PostsSchema = z.array(PostSchema);

// Post creation DTO (frontend input)
export const postCreateSchema = z.object({
  text: z.string(),               // frontend input
  code: z.string().optional(),
});

export const postUpdateSchema = z.object({
  id: z.number(),
  text: z.string(),
});

export const postDeleteSchema = z.object({
  id: z.number(),
});

// Type Inference
export type IUser = z.infer<typeof UserDTO>;
export type IPost = z.infer<typeof PostSchema>;
export type TPosts = z.TypeOf<typeof PostsSchema>;
export type TPost = z.TypeOf<typeof PostSchema>;
export type PostUpdate = z.TypeOf<typeof postUpdateSchema>;
export type PostDelete = z.TypeOf<typeof postDeleteSchema>;
export type PostCreate = z.TypeOf<typeof postCreateSchema>;

// ✅ New Login Type
export type LoginData = z.infer<typeof LoginDTO>;

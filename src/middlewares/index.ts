import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { _sessionStore } from "../database/sessionDB";

// Middleware to check if a user is already logged in
export const forwardAuthMiddleware = async (c: Context, next: Next) => {
  const sessionId = getCookie(c, "session");

  if (sessionId && (await _sessionStore.has(sessionId))) { // Added `await` to fix promise issue
    // User is already logged in, redirect them to the posts page
    return c.redirect("/posts");
  }

  await next();
};

// Middleware to enforce authentication
export const authMiddleware = async (c: Context, next: Next) => {
  const sessionId = getCookie(c, "session");

  if (!sessionId || !(await _sessionStore.has(sessionId))) { // Added `await`
    return c.redirect("/auth/login");
  }

  //user ID in request context
  c.set("userId", await _sessionStore.get(sessionId));
  await next();
};

//error handler
export const errorHandler = (c: Context, status: number = 401) => {
  return c.json(
    {
      success: false,
      message: c.error?.message,
      stack: process.env.NODE_ENV === "production" ? null : c.error?.stack,
    },
    status as 200 | 400 | 401 | 403 | 404 | 500 // define valid status codes
  );
};

export const notFound = (c: Context) => {
  return c.json(
    {
      success: false,
      message: `Not Found - [${c.req.method}] ${c.req.url}`,
    },
    404 //pass status correctly
  );
};

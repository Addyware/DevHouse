import { Context, Next } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { _sessionStore } from "../database/sessionDB";
import { getCookie } from "hono/cookie";

export const forwardAuthMiddleware = async (c: Context, next: Next) => {
  const sessionId = getCookie(c, "session");
  if (!sessionId || !_sessionStore.has(sessionId)) {
    return await next();
  }
  return c.redirect("/posts");
};

export const authMiddleware = async (c: Context, next: Next) => {
  const sessionId = getCookie(c, "session");
  if (!sessionId || !_sessionStore.has(sessionId)) {
    return c.redirect("/auth/login");
  }
  c.set("userId", _sessionStore.get(sessionId)); // Store user ID for later use
  await next();
};

export const errorHandler = (c: Context, status: number = 401) => {
  return c.json(
    {
      success: false,
      message: c.error?.message,
      stack: process.env.NODE_ENV === "production" ? null : c.error?.stack,
    },
    status as StatusCode
  );
};

export const notFound = (c: Context) => {
  return c.json(
    {
      success: false,
      message: `Not Found - [${c.req.method}] ${c.req.url}`,
    },
    404
  );
};

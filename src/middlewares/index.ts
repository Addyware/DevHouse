import { Context, Next } from "hono";
<<<<<<< HEAD
import { createMiddleware } from "hono/factory";
import { StatusCode } from "hono/utils/http-status";
import { db } from "../database/client";

export const forwardAuthMiddleware = async (c: Context, next: Next) => {
  const user = c.get("user");
  if (!user) {
    return await next();
  }
  return c.redirect("/posts");
};

export const authMiddleware = createMiddleware(async (c, next) => {
  const user = c.get("user");
  if (user) {
    return await next();
  }
  return c.redirect("/auth/login");
});
=======
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
>>>>>>> sprint2-authservice

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

// TODO: Refactor this file so we can inject a service into it.
// I know my implementation of this method is gross but it's 4am and I'm tired
// so let's just move along...(feel free to improve it, it's just a sample)
export const deserializeUser = createMiddleware(async (c, next) => {
  const session = c.get("session");
  const userId = session.get("userId"); // CALL THIS userId
  if (!userId) {
    c.set("user", null);
  } else {
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      c.set("user", null);
    } else {
      c.set("user", user);
    }
  }
  await next();
});

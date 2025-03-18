import { Context, Next } from "hono";
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

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { deserializeUser, errorHandler, notFound } from "./middlewares/index";
import { IController } from "./shared/interfaces";
import { prettyJSON } from "hono/pretty-json";
import { serveStatic } from "@hono/node-server/serve-static";
import { logger } from "hono/logger";
import { CookieStore, sessionMiddleware } from "hono-sessions";
import { RedisStoreAdapter } from "hono-sessions-redis";
import Redis from "ioredis";

export class App {
  private _app: Hono;
  private _store: CookieStore | RedisStoreAdapter;

  constructor(controllers: IController[]) {
    this._app = new Hono({ strict: false });

    this._store = this.initStore();
    this.initMiddleware();
    this.initControllers(controllers);
    this.initErrorHandling();
    serve({
      fetch: this._app.fetch,
      port: 8787,
    });
  }

  public build() {
    return this._app;
  }

  private initMiddleware() {
    this._app.use("*", logger(), prettyJSON());
    this._app.use("/static/*", serveStatic({ root: "./" }));
    this._app.use(
      "*",
      sessionMiddleware({
        store: this._store,
        encryptionKey: "password_at_least_32_characters_long",
        expireAfterSeconds: 60 * 60 * 24 * 2, // 2 days
        cookieOptions: {
          sameSite: "Lax", // Recommended for basic CSRF protection in modern browsers
          path: "/", // Required for this library to work properly
          httpOnly: true, // Recommended to avoid XSS attacks
        },
      })
    );
    this._app.use(deserializeUser);
  }

  private initStore() {
    console.log(process.env.NODE_ENVIRONMENT);
    return process.env.NODE_ENVIRONMENT === "prod"
      ? new RedisStoreAdapter({
          prefix: "AppPrefix:",
          ttl: 3600, // seconds
          client: new Redis({
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD,
            host: process.env.REDIS_HOST,
            port: 17048,
          }),
        })
      : new CookieStore();
  }

  private initErrorHandling() {
    this._app.onError((err, c) => {
      return errorHandler(c, (err as any).status || 500);
    });
    this._app.notFound((c) => {
      return notFound(c);
    });
  }

  private initControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this._app.route("/", controller.router);
    });
  }
}

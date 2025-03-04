import { Hono } from "hono";
import { errorHandler, notFound } from "./middlewares/index";
import { IController } from "./shared/interfaces";
import { prettyJSON } from "hono/pretty-json";
import { serveStatic } from "@hono/node-server/serve-static";
import { logger } from "hono/logger";

export class App {
  private _app: Hono;
  constructor(controllers: IController[]) {
    this._app = new Hono({ strict: false });
    this.initMiddleware();
    this.initControllers(controllers);
    this.initErrorHandling();
  }

  public build() {
    return this._app;
  }

  private async initMiddleware() {
    this._app.use("*", logger(), prettyJSON());
    this._app.use("/static/*", serveStatic({ root: "./" }));
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

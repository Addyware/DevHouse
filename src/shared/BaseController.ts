import { Hono } from "hono";
import { createFactory } from "hono/factory";

export abstract class BaseController {
  public router: Hono;
  public factory = createFactory();
  public path: string;

  constructor(path: string) {
    this.path = path;
    this.router = new Hono({ strict: false });
  }
}

import { Hono } from "hono";
import { createFactory } from "hono/factory";

export abstract class BaseController {
  public router: Hono;
  public factory = createFactory();
  constructor() {
    this.router = new Hono({ strict: false });
  }
}

import { User } from "@prisma/client";
import { Session } from "hono-sessions";
import { createFactory } from "hono/factory";
import { Hono } from "hono"

//this must fix to fix the session 
type SessionDataTypes = {
  userId: number | null;
};
type Env = {
  Variables: {
    user?: User;
    session: Session<SessionDataTypes>;
  };
};
export abstract class BaseController {
  public router : Hono<Env>;
  public factory = createFactory<Env>();
  constructor() {
    this.router = this.factory.createApp();
  }
}

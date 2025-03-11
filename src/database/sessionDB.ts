import { Redis } from "ioredis";
interface ISessionStore {
  set(sessionId: string, email: string): Promise<void>;
  delete(sessionId: string): Promise<void>;
  has(sessionId: string): Promise<boolean>;
  get(sessionId: string): Promise<string | undefined>;
}
class DevelopmentSessionStore implements ISessionStore {
  store: Map<string, string>;

  constructor() {
    console.log("Using Development Session Store");
    this.store = new Map<string, string>();
  }

  async get(sessionId: string): Promise<string | undefined> {
    return this.store.get(sessionId);
  }

  async has(sessionId: string): Promise<boolean> {
    return this.store.has(sessionId);
  }

  async set(sessionId: string, email: string): Promise<void> {
    this.store.set(sessionId, email);
  }

  async delete(sessionId: string): Promise<void> {
    this.store.delete(sessionId);
  }
}

class ProductionSessionStore implements ISessionStore {
  store: Redis;

  constructor() {
    if (!process.env.REDIS_CLIENT_CREDENTIAL) {
      throw new Error("REDIS_CLIENT_CREDENTIAL is not exist");
    }
    console.log("Using Production Session Store");
    this.store = new Redis(process.env.REDIS_CLIENT_CREDENTIAL);
  }

  async get(sessionId: string): Promise<string | undefined> {
    const value = await this.store.get(sessionId);
    return value ? value : undefined;
  }

  async has(sessionId: string): Promise<boolean> {
    const value = await this.get(sessionId);
    return value !== undefined;
  }

  async set(sessionId: string, email: string): Promise<void> {
    await this.store.set(sessionId, email);
  }

  async delete(sessionId: string): Promise<void> {
    await this.store.del(sessionId);
  }
}

export const _sessionStore: ISessionStore =
  process.env.NODE_ENV === "production" ||
  process.env.SESSION_ENV === "production"
    ? new ProductionSessionStore()
    : new DevelopmentSessionStore();

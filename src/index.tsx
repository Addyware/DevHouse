import { HomeController, PostController, AuthController } from "./areas";
import { MockAuthService, MockPostsService } from "./areas";
import { App } from "./server";

// localhost:3000/auth/login
const app = new App([
  new HomeController(),
  new AuthController(new MockAuthService()),
  new PostController(new MockPostsService()),
]).build();

export default app;

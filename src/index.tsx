import 'dotenv/config';
import { AuthController, HomeController, MockAuthService, MockPostsService, PostController } from "./areas";
import { App } from "./server";

const app = new App([
  new HomeController(),
  new AuthController(new MockAuthService()),
  new PostController(new MockPostsService()),
]).build();

export default app;

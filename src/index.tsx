import { HomeController, PostController, AuthController } from "./areas";
import { MockAuthService, MockPostsService } from "./areas";
import { AuthService } from "./areas/Auth/services/AuthService";
import { App } from "./server";

const app = new App([
  new HomeController(),
  new AuthController(new AuthService()),
  new PostController(new MockPostsService()),
]).build();

export default app;

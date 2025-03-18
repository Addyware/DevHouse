import { z } from "zod";
import { authMiddleware, forwardAuthMiddleware } from "../../middlewares";
import { BaseController } from "../../shared/BaseController";
import { UserDTO } from "../../shared/dtos";
import { IAuthService, IController } from "../../shared/interfaces";
import { Layout } from "../../shared/Layout";
import { Header } from "../Posts/views/Header";
import { Login, Register } from "./views";
import { Profile } from "./views/Profile";

export class AuthController extends BaseController implements IController {
  public readonly path: string = "/auth";
  private _authService: IAuthService;

  constructor(service: IAuthService) {
    super();
    this._authService = service;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Register Routes
    this.router.get(
      `${this.path}/register`,
      forwardAuthMiddleware,
      ...this.showRegisterPage
    );
    this.router.post(`${this.path}/register`, ...this.registerUser);
    // Login Routes
    this.router.get(
      `${this.path}/login`,
      forwardAuthMiddleware,
      ...this.showLoginPage
    );
    this.router.post(`${this.path}/login`, ...this.loginUser);
    this.router.get(`${this.path}/logout`, ...this.logoutUser);
    this.router.get(
      `${this.path}/profile`,
      authMiddleware,
      ...this.showProfile
    );
  }

  /*
   *********************
   *  Register Routes  *
   *********************
   */
  private showRegisterPage = this.factory.createHandlers((c) => {
    const error = c.req.query("error") || "";
    return c.render(
      <Layout>
        <Register error={error} />
      </Layout>
    );
  });

  private registerUser = this.factory.createHandlers(async (c) => {
    const { error, data: validatedUser } = UserDTO.safeParse(
      await c.req.parseBody()
    );
    if (error) return c.redirect(`/auth/register?error=${encodeURIComponent(error.message)}`);
    try {
      await this._authService.createUser(validatedUser);
    } catch (error: any) {
      return c.redirect(
        `/auth/register?error=${encodeURIComponent(error.message)}`
      );
    }
    return c.redirect("/auth/login");
  });
  /*
   *********************
   *   Login Routes    *
   *********************
   */
  private showLoginPage = this.factory.createHandlers((c) => {
    const error = c.req.query("error") || "";
    return c.render(
      <Layout>
        <Login error={error} />
      </Layout>
    );
  });

  private loginUser = this.factory.createHandlers(async (c) => {
    try {
      const validatedUser = UserDTO.parse(await c.req.parseBody());
      const foundUser = await this._authService.loginUser(validatedUser);
      console.log(foundUser);
      const session = c.get("session");
      session.set("userId", foundUser.id!);
      console.log("The sesson", session);
      return c.redirect("/posts");
    } catch (err) {
      let errorMessage = "";
      if (err instanceof z.ZodError) {
        errorMessage = err.issues[0].message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      return c.redirect(
        `/auth/login?error=${encodeURIComponent(errorMessage)}`
      );
    }
  });

  private logoutUser = this.factory.createHandlers(async (c) => {
    const session = c.get("session");
    session.set("userId", null);
    return c.redirect("/auth/login");
  });
  /*
   *********************
   *  Profile Routes   *
   *********************
   */
  private showProfile = this.factory.createHandlers((c) =>
    c.html(
      <Layout>
        <Header />
        <Profile />
      </Layout>
    )
  );
}

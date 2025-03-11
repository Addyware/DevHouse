import { zValidator as validate } from "@hono/zod-validator";
import { randomUUID } from "node:crypto";
import { _sessionStore } from "../../database/sessionDB";
import { authMiddleware, forwardAuthMiddleware } from "../../middlewares";
import { BaseController } from "../../shared/BaseController";
import { UserDTO } from "../../shared/dtos";
import { IAuthService, IController } from "../../shared/interfaces";
import { Layout } from "../../shared/Layout";
import { Login, Register } from "./views";

import { getCookie, setCookie } from "hono/cookie";
import { Header } from "../Posts/views/Header";
import { Profile } from "./views/Profile";

export class AuthController extends BaseController implements IController {
  // public readonly path: string = "/auth";
  private _authService: IAuthService;

  constructor(service: IAuthService) {
    super("/auth");
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
    this.router.post(
      `${this.path}/register`,
      forwardAuthMiddleware,
       ...this.registerUser);

    // Login Routes
    this.router.get(
      `${this.path}/login`,
      forwardAuthMiddleware,
      ...this.showLoginPage
    );
    this.router.post(
      `${this.path}/login`,
      forwardAuthMiddleware,
       ...this.loginUser);

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
  private showRegisterPage = this.factory.createHandlers((c) =>
    c.html(
      <Layout>
        <Register error="" />
      </Layout>
    )
  );

  private registerUser = this.factory.createHandlers(
    validate("form", UserDTO),
    async (c) => {
      const validatedUser = c.req.valid("form");

      try {
        const newUser = await this._authService.createUser(validatedUser);
        return c.redirect("/auth/login");
      } catch (error){
        throw new Error()
      }
    }
  );
  
  /*
   *********************
   *   Login Routes    *
   *********************
   */
  private showLoginPage = this.factory.createHandlers((c) =>
    c.render(
      <Layout>
        <Login />
      </Layout>
    )
  );

  private loginUser = this.factory.createHandlers(
    validate("form", UserDTO, (result, c) => {
      if (!result.success) {
        const errorMessage = result.error.errors?.[0].message
          return c.render(
            <Layout>
              <Login errorMessage={errorMessage}/>
            </Layout>
          )
      }
    }),
    async (c) => {
<<<<<<< HEAD
      const validatedUser = c.req.valid("form");
      
      try {
        const foundUser = await this._authService.loginUser(validatedUser);
  
        const sessionId = randomUUID(); // Generate unique session ID
        _sessionStore.set(sessionId, foundUser.email);
=======
      try {
        const validatedUser = c.req.valid("form");
        const foundUser = await this._authService.loginUser(validatedUser);
        const sessionId = randomUUID(); // Generate unique session ID
        await _sessionStore.set(sessionId, foundUser.email);
>>>>>>> login-error
        setCookie(c, "session", sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 30 * 60, // 30min
          path: "/",
        });
<<<<<<< HEAD
      return c.redirect("/");
    } catch (error) {
      console.error("Login Error:", error);
      return c.html(
        <Layout>
          <Login />
        </Layout>
      );
=======
        return c.redirect("/");
      } catch (err) {
        if(err instanceof Error && err.message === "User not found"){
          const errorMessage = "Invalid Login Credentials. Please try again"
          return c.render(
            <Layout>
              <Login errorMessage={errorMessage}/>
            </Layout>
          )
        } else {
          throw err
        }
      }
>>>>>>> login-error
    }
  }
  );

  private logoutUser = this.factory.createHandlers(async (c) => {
    const sessionId = getCookie(c, "session");
    if (sessionId) {
      await _sessionStore.delete(sessionId); // Remove session from memory
    }

    // Clear the session cookie
    setCookie(c, "session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0, // Expire immediately
      path: "/",
    });

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

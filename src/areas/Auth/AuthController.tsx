import { Layout } from "../../shared/Layout";
import { Login, Register } from "./views";
import { IController, IAuthService } from "../../shared/interfaces";
import { BaseController } from "../../shared/BaseController";
import { zValidator as validate } from "@hono/zod-validator";
import { UserDTO } from "../../shared/dtos";
import { randomUUID } from "node:crypto";
import { getCookie, setCookie } from "hono/cookie";
import { _sessionStore } from "../../database/sessionDB";
import { authMiddleware, forwardAuthMiddleware } from "../../middlewares";
import { Profile } from "./views/Profile";
import { Header } from "../Posts/views/Header";

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
  private showRegisterPage = this.factory.createHandlers((c) =>
    c.html(
      <Layout>
        <Register />
      </Layout>
    )
  );

  private registerUser = this.factory.createHandlers(
    validate("form", UserDTO),
    async (c) => {
      try {
        const validatedUser = c.req.valid("form");

        // Attempt to create the user
        const createdUser = await this._authService.createUser(validatedUser);

        if (!createdUser) {
          console.error("User registration failed");
          return c.html(
            <Layout>
              <Register />
              <p className="text-red-600">Registration failed. Try again.</p>
            </Layout>
          );
        }

        return c.redirect("/auth/login");
      } catch (error) {
        console.error("Error during registration:", error);
        return c.html(
          <Layout>
            <Register />
            <p className="text-red-600">User already exists or invalid data.</p>
          </Layout>
        );
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
    validate("form", UserDTO),
    async (c) => {
      try {
        const validatedUser = c.req.valid("form");

        // Authenticate user
        const foundUser = await this._authService.loginUser(validatedUser);
        if (!foundUser) {
          console.error("Login failed: Invalid credentials");
          return c.html(
            <Layout>
              <Login />
              <p className="text-red-600">Invalid email or password.</p>
            </Layout>
          );
        }

        // Generate a session ID
        const sessionId = randomUUID();
        _sessionStore.set(sessionId, foundUser.email);

        // Set secure session cookie
        setCookie(c, "session", sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 30 * 60, // 30 minutes
          path: "/",
        });

        return c.redirect("/");
      } catch (error) {
        console.error("Error during login:", error);
        return c.html(
          <Layout>
            <Login />
            <p className="text-red-600">Invalid credentials. Please try again.</p>
          </Layout>
        );
      }
    }
  );

  private logoutUser = this.factory.createHandlers(async (c) => {
    try {
      const sessionId = getCookie(c, "session");
      if (sessionId) {
        _sessionStore.delete(sessionId);
      }

      // Clear session cookie
      setCookie(c, "session", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0, // Expire immediately
        path: "/",
      });

      return c.redirect("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      return c.redirect("/auth/login");
    }
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

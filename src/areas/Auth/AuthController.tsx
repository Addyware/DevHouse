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
<<<<<<< HEAD
    this.router.post(
      `${this.path}/register`,
      forwardAuthMiddleware,
       ...this.registerUser);
=======
    this.router.post(`${this.path}/register`, ...this.registerUser);
>>>>>>> feature/password-hashing

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
<<<<<<< HEAD
      const validatedUser = c.req.valid("form");

      try {
        const newUser = await this._authService.createUser(validatedUser);
        return c.redirect("/auth/login");
      } catch (error){
        throw new Error()
      }
    }
  );
  
=======
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

>>>>>>> feature/password-hashing
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
=======
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
>>>>>>> feature/password-hashing
    }
  }
  );

  private logoutUser = this.factory.createHandlers(async (c) => {
<<<<<<< HEAD
    const sessionId = getCookie(c, "session");
    if (sessionId) {
      await _sessionStore.delete(sessionId); // Remove session from memory
=======
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
>>>>>>> feature/password-hashing
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

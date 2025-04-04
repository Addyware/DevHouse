<<<<<<< HEAD
import { Error } from "./ErrorBox";
=======
>>>>>>> sprint2-authservice
type Props = {
  error: string;
};
<<<<<<< HEAD
export function Login({ error }: Props) {
=======

export function Login({ errorMessage = "" }: Props) {
>>>>>>> sprint2-authservice
  return (
    <div class="bg-white font-family-karla h-screen">
      <div class="w-full flex flex-wrap">
        <div class="w-full md:w-1/2 flex flex-col">
          <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            <a href="#" class="bg-black text-white font-bold text-xl p-4">
              devHouse
            </a>
          </div>

<<<<<<< HEAD
          <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            {error && <Error>{error}</Error>}
            <p class="text-center text-3xl">Welcome back.</p>
=======
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Welcome back.</p>
            {errorMessage && <p className="text-center text-red-600">{errorMessage}</p>}
            
>>>>>>> sprint2-authservice
            <form
              class="flex flex-col pt-3 md:pt-8"
              method="post"
              action="/auth/login"
            >
<<<<<<< HEAD
              <div class="flex flex-col pt-4">
                <label for="email" class="text-lg">
                  Email
                </label>
=======
              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">Email</label>
>>>>>>> sprint2-authservice
                <input
                  type="email"
                  required
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

<<<<<<< HEAD
              <div class="flex flex-col pt-4">
                <label for="password" class="text-lg">
                  Password
                </label>
=======
              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">Password</label>
>>>>>>> sprint2-authservice
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <input
                type="submit"
                value="Log In"
                class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8 cursor-pointer"
              />
            </form>
            <div class="text-center pt-12 pb-12">
              <p>
                Don't have an account?&nbsp;
                <a href="/auth/register" class="underline font-semibold">
                  Register here.
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="w-1/2 shadow-2xl">
          <img
            class="object-cover w-full h-screen hidden md:block"
            src="https://images.unsplash.com/photo-1549707523-fe7b18f2e172?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>
    </div>
  );
}

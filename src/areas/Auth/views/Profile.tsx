export function Profile() {
  return (
    <section class="py-10 my-auto dark:bg-gray-900">
      <div class="lg:w-[80%] md:w-[90%] w-[96%] mx-auto flex gap-4">
        <div class="lg:w-[88%] sm:w-[88%] w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
          <div class="">
            <h1 class="lg:text-3xl md:text-2xl text-xl mb-2 dark:text-white">
              Profile
            </h1>
            <h2 class="text-grey text-sm mb-4 dark:text-gray-400">
              Edit Profile
            </h2>
            <form>
              <div class="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('https://morgancarter.com.au/assets/images/blog/encouraging-upload/thumbnail.png')] bg-cover bg-center bg-no-repeat">
                <div class="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                  <input
                    type="file"
                    name="profile"
                    id="upload_profile"
                    hidden
                    required
                  />

                  <label for="upload_profile">
                    <svg
                      data-slot="icon"
                      class="w-6 h-5 text-blue-700"
                      fill="none"
                      stroke-width="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                      ></path>
                    </svg>
                  </label>
                </div>
              </div>
              <div class="flex flex-col lg:flex-row gap-2 justify-center w-full">
                <div class="w-full  mb-4 mt-6">
                  <input
                    type="text"
                    class="mt-2 p-4 w-full border-2 rounded-lg text-gray-500 border-gray-300"
                    placeholder="Email"
                  />
                </div>
                <div class="w-full  mb-4 lg:mt-6">
                  <input
                    type="password"
                    class="mt-2 p-4 w-full border-2 rounded-lg text-gray-500 border-gray-300"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div class="w-full rounded-lg bg-indigo-600 mt-4 text-white text-lg font-semibold">
                <button
                  disabled
                  type="submit"
                  class="w-full p-4 hover:cursor-pointer disabled:bg-gray-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

import { CommentsBar } from "./CommentsBar";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg
            className="w-6 h-6 text-indigo-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 3L4 9v12h16V9l-8-6zm0 1.618l6 4.5V20H6V9.118l6-4.5z" />
          </svg>
          <h1 className="text-2xl text-indigo-700">
            <a href="/">DevHouse</a>
          </h1>
        </div>
        <div className="relative">
          <div
            className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center cursor-pointer hover:bg-indigo-200"
            id="dropdown"
          >
            <span className="text-indigo-700 font-semibold">
              {" "}
              <img
                src="https://morgancarter.com.au/assets/images/blog/encouraging-upload/thumbnail.png"
                className="w-full h-full object-cover"
              />
            </span>
          </div>

          <div
            id="dropdown-items"
            className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
          >
            <a
              href="/auth/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
            >
              Profile
            </a>
            <a
              href="/auth/logout"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
            >
              Logout
            </a>
          </div>
        </div>
        <CommentsBar />
      </div>
    </header>
  );
}

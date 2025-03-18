import { IPost, TPosts } from "../../../shared/dtos";
import { Post } from "./Post";

type Props = {
  posts: TPosts;
};
export function Index({ posts }: Props) {
  return (
    <div className="min-h-screen">
      <main className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm mt-4 p-4 hover:bg-gray-100 transition-all duration-300 ease-in-out">
          <form onSubmit={() => {}}>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img
                  src="https://morgancarter.com.au/assets/images/blog/encouraging-upload/thumbnail.png"
                  alt="Your profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <textarea
                  className="w-full border-0 text-lg resize-none placeholder-gray-400 p-2 rounded outline-none hover:bg-gray-100 transition-all duration-300 ease-in-out"
                  placeholder="What's happening?"
                  rows={3}
                  value={"New Post"}
                ></textarea>
              </div>
            </div>
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 focus:outline-none"
              >
                Post
              </button>
            </div>
          </form>
        </div>

        <div className="mt-4 space-y-4">
          {posts.map((p) => {
            return <Post post={p} />;
          })}
        </div>
      </main>
    </div>
  );
}

import { Comment } from "./Comment";
import { CommentsBarHeader } from "./CommentsBarHeader";
import { CommentsSection } from "./CommentsSection";
import { CreateCommentForm } from "./CreateCommentForm";

export function CommentsBar() {
  return (
    <div
      id="sideBar"
      class="fixed top-0 right-0 bg-transparent w-0 h-full overflow-x-hidden duration-500 z-10"
    >
      <div
        id="sideNav"
        class="fixed top-0 right-0 shadow-lg bg-white text-black w-0 h-full flex justify-center items-baseline overflow-x-hidden duration-500 font-bold z-50"
      >
        <a
          id="Xbtn"
          href="javascript:void(0)"
          class="text-3xl absolute top-0 right-0 mr-3 mt-2"
        >
          &times;
        </a>
        <CommentsSection>
          <CommentsBarHeader />
          <CreateCommentForm />
          <Comment />
        </CommentsSection>
      </div>
    </div>
  );
}

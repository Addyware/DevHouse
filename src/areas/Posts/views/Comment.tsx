export function Comment() {
  return (
    <article class="p-10 mb-3 text-base bg-white border-b-2 border-indigo-100">
      <div class="flex items-center">
        <p class="inline-flex items-center mr-3 text-gray-500">
          <img
            class="mr-2 w-6 h-6 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie Green"
          />
          Bonnie Green
        </p>
        <p class="text-sm text-gray-500">
          <time pubdate datetime="2022-03-12" title="March 12th, 2022">
            Mar. 12, 2022
          </time>
        </p>
      </div>

      <p class="text-gray-500">
        The article covers the essentials, challenges, myths and stages the UX
        designer should consider while creating the design strategy.
      </p>
    </article>
  );
}

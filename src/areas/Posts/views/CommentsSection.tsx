import { PropsWithChildren } from "hono/jsx";

export function CommentsSection({ children }: PropsWithChildren) {
  return (
    <section class="bg-white py-8">
      <div class="max-w-2xl mx-auto px-4">{children}</div>
    </section>
  );
}

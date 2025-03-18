import { PropsWithChildren } from "hono/jsx";

export function Error({ children }: PropsWithChildren) {
  return (
    <div
      class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span class="font-medium">{children}</span>
    </div>
  );
}

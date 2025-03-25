import React, { useEffect, useState } from "react";

export function Profile() {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const query = new URLSearchParams(window.location.search);
      setSuccess(query.get("success"));
      setError(query.get("error"));
    }
  }, []);

  return (
    <section className="py-10 my-auto dark:bg-gray-900">
      <div className="lg:w-[80%] md:w-[90%] w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] sm:w-[88%] w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
          <div>
            <h1 className="lg:text-3xl md:text-2xl text-xl mb-2 dark:text-white">Profile</h1>
            <h2 className="text-grey text-sm mb-4 dark:text-gray-400">Edit Profile</h2>

            {success && (
              <p className="text-green-600 font-medium mb-4">
                Profile updated successfully!
              </p>
            )}
            {error && (
              <p className="text-red-600 font-medium mb-4">
                Failed to update profile. Try again.
              </p>
            )}

            <form method="post" action="/auth/profile">
              {/* ... Your form content stays the same ... */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

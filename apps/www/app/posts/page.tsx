import { fetchCollection } from "@/lib/strapi";
import Link from "next/link";

interface Post {
  id: number;
  documentId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export const dynamic = "force-dynamic";

async function getPosts() {
  try {
    const data = await fetchCollection("posts", {
      sort: "createdAt:desc",
    });
    return data.data as Post[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col gap-8 py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Posts
          </h1>
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Content fetched from our Strapi CMS
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 dark:border-zinc-800 p-8 text-center">
            <p className="text-zinc-600 dark:text-zinc-400">
              No posts found. Create some posts in your Strapi CMS to see them
              here!
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              Visit{" "}
              <a
                href="http://localhost:1337/admin"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-zinc-950 dark:text-zinc-50 hover:underline"
              >
                Strapi Admin
              </a>{" "}
              to create content.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <article
                key={post.documentId}
                className="flex flex-col gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
              >
                <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
                  {post.title}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 line-clamp-3">
                  {post.content}
                </p>
                <time className="text-sm text-zinc-500 dark:text-zinc-500">
                  {new Date(
                    post.publishedAt || post.createdAt,
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const blogs = await getCollection("blog");

  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  if (slug) {
    const post = blogs.find((blog) => blog.slug === slug);

    if (post) {
        return new Response(JSON.stringify(post), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } else
        return new Response(JSON.stringify({ message: "Not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
  }

  return new Response(JSON.stringify(blogs), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

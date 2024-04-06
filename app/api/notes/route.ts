export const runtime = "edge";

export async function POST(request: Request) {
  return new Response("Hello, world!");
}

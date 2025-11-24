import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_SECRET = "random-secret-value";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || authHeader !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { model, event, entry } = body;

    // TODO: add better logic to handle different models and events and revalidation.
    if (model === "homepage") {
      revalidatePath("/");
    }

    if (model === "post") {
      revalidatePath("/");
      revalidatePath("/posts");

      if (entry?.id) {
        revalidatePath(`/posts/${entry.id}`);
      }

      revalidateTag("posts", {
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Revalidation triggered",
        model,
        event,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

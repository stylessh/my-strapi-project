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

    if (model === "marketing-page") {
      revalidatePath("/");

      if (entry?.slug) {
        revalidatePath(`/${entry.slug}`);
      }
    }

    if (model === "post") {
      revalidatePath("/");
      revalidatePath("/posts");

      if (entry?.id) {
        revalidatePath(`/posts/${entry.id}`);
      }
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

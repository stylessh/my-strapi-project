import { draftMode } from "next/headers";
import Link from "next/link";

export async function DraftModeBadge() {
  const { isEnabled } = await draftMode();

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="bg-yellow-500 text-black px-4 py-2 flex items-center justify-between gap-3 max-w-3xl mx-auto fixed inset-x-0 top-0">
      <div className="flex items-center gap-4">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-900 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-900"></span>
        </span>
        <span className="font-semibold">Draft Mode Active</span>
      </div>

      <a
        href="/api/exit-preview"
        className=" text-black font-bold px-2.5 py-1 rounded text-sm hover:bg-black/20 transition-colors"
      >
        X
      </a>
    </div>
  );
}

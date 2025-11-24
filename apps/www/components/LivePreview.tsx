"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function LivePreview() {
  const router = useRouter();

  useEffect(() => {
    const handleMessage = async (message: MessageEvent<any>) => {
      const { origin, data } = message;

      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
      if (!strapiUrl || origin !== strapiUrl) {
        return;
      }

      if (data.type === "strapiUpdate") {
        router.refresh();
      } else if (data.type === "strapiScript") {
        const script = window.document.createElement("script");
        script.textContent = data.payload.script;
        window.document.head.appendChild(script);
      }
    };

    window.addEventListener("message", handleMessage);

    window.parent?.postMessage({ type: "previewReady" }, "*");

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [router]);

  return null;
}

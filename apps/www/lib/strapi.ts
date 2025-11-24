import { strapi } from "@strapi/client";
import { draftMode } from "next/headers";

const baseURL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api";
const authToken = process.env.STRAPI_AUTH_TOKEN || "";

export const strapiClient = strapi({
  baseURL,
  auth: authToken,
});

// Draft-aware collection fetcher
export async function fetchCollection(
  collectionName: string,
  params: Record<string, any> = {},
) {
  const { isEnabled: isDraftMode } = await draftMode();

  const queryParams = {
    ...params,
    ...(isDraftMode && { status: "draft" as const }),
  };

  const collection = strapiClient.collection(collectionName);
  return await collection.find(queryParams);
}

// Draft-aware single type fetcher
export async function fetchSingle(
  singleName: string,
  params: BaseQueryParams = {},
) {
  const { isEnabled: isDraftMode } = await draftMode();

  const queryParams = {
    ...params,
    ...(isDraftMode && { status: "draft" as const }),
  };

  const single = strapiClient.single(singleName);
  return await single.find(queryParams);
}

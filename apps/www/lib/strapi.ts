import { strapi } from "@strapi/client";

export const strapiClient = strapi({
  baseURL:
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api",
  auth: "8d1133ad58f0d81ba7e54385a367a8e4704a210c51a3622a002ca12c0f838210d908d28d2527a27ab96883189d2733c689b0323a95886eb54e58f09ec1f2c7dd503ef6939ec4fa63560fbbc0d9a3921df28e799db6182d7a14d821235173819883577df467bd6a2e8948514b3d5b6765ce9f76a9a8521ebafee823091c2a2584",
});

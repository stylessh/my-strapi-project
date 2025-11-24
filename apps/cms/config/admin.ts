// Function to generate preview pathname based on content type and document
const getPreviewPathname = (
  uid: string,
  { locale, document }: any,
): string | null => {
  const { slug, documentId } = document;

  switch (uid) {
    case "api::post.post": {
      if (!slug) {
        return "/posts";
      }
      return `/posts/${slug}`;
    }
    case "api::homepage.homepage": {
      return "/";
    }
    default: {
      return null;
    }
  }
};

export default ({ env }) => {
  const clientUrl = env("CLIENT_URL");
  const previewSecret = env("PREVIEW_SECRET");

  return {
    auth: {
      secret: env("ADMIN_JWT_SECRET"),
    },
    apiToken: {
      salt: env("API_TOKEN_SALT"),
    },
    transfer: {
      token: {
        salt: env("TRANSFER_TOKEN_SALT"),
      },
    },
    secrets: {
      encryptionKey: env("ENCRYPTION_KEY"),
    },
    flags: {
      nps: env.bool("FLAG_NPS", true),
      promoteEE: env.bool("FLAG_PROMOTE_EE", true),
    },
    preview: {
      enabled: true,
      config: {
        allowedOrigins: clientUrl,
        async handler(uid: string, { documentId, locale, status }: any) {
          // @ts-ignore - Strapi types need to be updated
          const document = await strapi.documents(uid).findOne({ documentId });

          const pathname = getPreviewPathname(uid, { locale, document });

          if (!pathname) {
            return null;
          }

          const urlSearchParams = new URLSearchParams({
            url: pathname,
            secret: previewSecret,
            status,
          });

          return `${clientUrl}/api/preview?${urlSearchParams}`;
        },
      },
    },
  };
};

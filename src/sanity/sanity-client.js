import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "kahewutj",
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-03-08",
});

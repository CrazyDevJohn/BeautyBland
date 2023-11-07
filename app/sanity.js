import { createClient } from "@sanity/client";
import { fetchQuery } from "./utils/supports";

const client = createClient({
  projectId: "gpsdg1wy",
  dataset: "production",
  apiVersion: "2023-11-07",
  useCdn: true,
});

export const fetchFeeds = async () => {
  let data = await client.fetch(fetchQuery).then((feeds) => {
    return feeds;
  });
  return data;
};

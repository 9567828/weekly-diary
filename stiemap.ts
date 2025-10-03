import type { MetadataRoute } from "next";

const URL = "https://www.weekly-diary.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${URL}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${URL}/diary`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${URL}/calendar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}

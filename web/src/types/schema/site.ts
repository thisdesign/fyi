import type { SanityDocument } from "@sanity/client";
import type { SanityImage } from "../sanity";
import type { ProductSchema } from "./product";

export type SiteSchema = {
  _type: "site";
  seo?: {
    description?: string;
    metaImage?: SanityImage;
  };
  products?: ProductSchema[];
  title?: string;
} & SanityDocument;

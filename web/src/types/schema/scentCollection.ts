import type { SanityBlockContent, SanitySlug } from "../sanity";
import type { ProductSchema } from "./product";

export type ScentCollection = {
  slug?: SanitySlug;
  title?: string;
  products?: ProductSchema[];
  description?: SanityBlockContent;
};

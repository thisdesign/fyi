export const seoDescription = {
  name: "description",
  title: "Description",
  type: "text",
  rows: 2,
  description:
    "Enter a description to get a better ranking on search engines like Google. 50–160 characters reccommended",

  validation: (Rule) =>
    Rule.max(160).warning(
      "Descriptions between 50–160 characters reccommended for SEO purposes"
    ),
};

export const seoTitle = {
  name: "title",
  title: "Page Title",
  type: "string",
  validation: (Rule) => Rule.required(),
  description:
    "The page displays in the browser's tab and when the page is shared on social media.",
};

export const seoImage = {
  title: "Social sharing image",
  description:
    "When you share a link to your store on social media, an image is usually shown in your post.",
  name: "metaImage",
  type: "image",
  options: {
    hotspot: true,
  },
};

const TEXT = {
  title: "Text",
  name: "text",
  type: "array",
  of: [
    {
      type: "block",
      styles: [],
      lists: [],
    },
  ],
};

export default {
  type: "document",
  name: "site",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Site Title",
      validation: (Rule) => Rule.required(),
    },

    /**
     * General
     */
    {
      name: "general",
      type: "object",
      description: "General site settings",

      fields: [
        {
          type: "file",
          name: "backgroundVideo",
        },
        {
          type: "string",
          name: "contactEmail",
        },
      ],
    },

    /**
     * Intro
     */
    {
      name: "preload",
      type: "object",

      fields: [
        {
          name: "preloadHead",
          type: "text",
          rows: 3,
        },
        {
          name: "preloadBody",
          type: "text",
          rows: 3,
        },
        {
          title: "Latitude",
          name: "lat",
          type: "number",
        },
        {
          title: "longitude",
          name: "lng",
          type: "number",
        },
      ],
    },

    /**
     * Home
     */
    {
      name: "home",
      type: "object",

      fields: [
        {
          ...TEXT,
          name: "intro",
          description: "Homepage large introduction text",
        },
        {
          ...TEXT,
          name: "paragraph",
          description: "Homepage paragraph text",
        },
        {
          name: "twoCol",
          type: "boolean",
          title: "Display text in two columns?",
        },
        {
          type: "file",
          name: "video",
          title: "Featured video",
          description:
            "If no video is provided, the video will default to the placeholder photo",
        },
        {
          name: "homeImage",
          type: "image",
          description:
            "Serves as placeholder for video when paused. Will replace video if no video file is provided above.",
          options: {
            hotspot: true,
          },
        },
      ],
    },

    /**
     * Inspiration
     */

    {
      name: "inspiration",
      type: "object",

      fields: [
        {
          name: "documents",
          description:
            "Add and rearrange inspiration items for the inspiration page",
          type: "array",
          of: [
            {
              name: "item",
              type: "reference",
              to: [{ type: "inspiration" }],
            },
          ],
        },
      ],
    },

    /**
     * SEO
     */

    {
      name: "seo",
      title: "SEO Options",
      type: "object",
      fields: [seoTitle, seoDescription, seoImage],
      description:
        "Shows up in search previews, social media, and share links. ",
      options: {
        collapsable: true,
        collapsed: false,
      },
    },
  ],
};

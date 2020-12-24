export default {
  type: "document",
  name: "inspiration",
  fields: [
    {
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      description: "This is used to generate page URL",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
      },
    },

    {
      name: "category",
      description: "Link this page to an existing Inspiration Category",
      type: "reference",
      to: [{ type: "inspirationCategory" }],
    },

    {
      name: "vimeoUrl",
      description: "Link to Vimeo video",
      type: "url",
    },

    {
      name: "href",
      description: "Link to external website",
      type: "url",
      title: "External Link",
    },

    {
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
    },
  ],
};

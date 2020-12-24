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
  ],
};

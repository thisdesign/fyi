import React from "react";
import Emoji from "a11y-react-emoji";

const Icon = () => <Emoji style={{ fontSize: "2rem" }} symbol="💡" />;

export default {
  type: "document",
  name: "inspiration",
  icon: Icon,
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
      name: "video",
      description: "Link Video File",
      type: "file",
    },

    {
      name: "layout",
      description: (
        <>
          Layout. See{" "}
          <a href="https://www.notion.so/tylermcrobert/736f4e4f650f43cd97adf47b6fd45e76?v=fbb56074dc6846ecb1742464ad6f3a29">
            guide
          </a>{" "}
          for details
        </>
      ),
      type: "number",
    },

    {
      name: "image",
      description: "Video Placeholder",
      type: "image",
      options: {
        hotspot: true,
      },
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

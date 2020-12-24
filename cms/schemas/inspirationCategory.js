import React from "react";
import Emoji from "a11y-react-emoji";

const Icon = () => <Emoji style={{ fontSize: "2rem" }} symbol="🗄" />;

export default {
  type: "document",
  name: "inspirationCategory",
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
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
      },
    },
  ],
};

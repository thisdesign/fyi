import React from "react";
import S from "@sanity/desk-tool/structure-builder";
import Emoji from "a11y-react-emoji";

const ConfigIcon = () => <Emoji style={{ fontSize: "2rem" }} symbol="⚙️" />;

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .icon(ConfigIcon)
        .child(S.editor().schemaType("site").documentId("site")),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !["site"].includes(listItem.getId())
      ),
    ]);

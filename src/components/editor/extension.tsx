import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import SlashCommand from "./slash-conmmand";
import Strike from "@tiptap/extension-strike";

import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ImageHandler from "./image-handler";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-imagresize";
import { GrBottomCorner } from "react-icons/gr";
import React from "react";

export const TipTapEditorExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-outside leading-3",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-outside leading-3",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-normal",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "my-blockquote",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "rounded-md bg-gray-200 p-5 font-mono font-medium text-gray-800",
      },
    },
    code: {
      HTMLAttributes: {
        class:
          "rounded-md bg-gray-200 px-1.5 py-1 font-mono font-medium text-red-600",
      },
    },

    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
  }),
  Placeholder.configure({
    placeholder: ({ node }: any) => {
      if (node.type.name === "heading") {
        return `Heading ${node.attrs.level}`;
      }
      return `Press '/' for commands, or enter some text...`;
    },
    includeChildren: true,
  }),
  SlashCommand,
  Underline,
  Strike,
  Link,
  Color.configure({
    types: ["textStyle"],
  }),
  TextStyle,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Image,
  ImageHandler,
  ImageResize.configure({ useFigure: true }),
];

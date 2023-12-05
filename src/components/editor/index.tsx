"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { TipTapEditorExtensions } from "./extension";
import { BubbleMenu } from "./bubble";

// TIPTAP Client Configuration Component
export default function Editor() {
  const editor = useEditor({
    // create edition instance
    extensions: TipTapEditorExtensions,
    content: "<h1>Untitled</h1>",
  });

  return (
    <div>
      {editor && <BubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}

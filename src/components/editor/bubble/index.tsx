import { BubbleMenu as BubbleMenuReact, Editor } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import SelectionMenu, { SelectionMenuType } from "./SelectionMenu";

export interface BubbleMenuProps {
  editor: Editor;
}

export const BubbleMenu = ({ editor }: BubbleMenuProps) => {
  const [selectionType, setSelectionType] = useState<SelectionMenuType>(null);
  const ref = useRef(null);
  useEffect(() => {
    if (selectionType !== "link") setSelectionType(null);
  }, []);
  if (!editor) return null;

  return (
    <BubbleMenuReact
      pluginKey="bubbleMenu"
      editor={editor}
      className="bubble-menu"
      tippyOptions={{
        onHidden: () => {
          setSelectionType(null);
        },
      }}
    >
      <SelectionMenu
        editor={editor}
        selectionType={selectionType}
        setSelectionType={setSelectionType}
      />
    </BubbleMenuReact>
  );
};

import { Editor } from "@tiptap/react";
import clsx from "clsx";
import {
  Bold,
  Heading,
  Italic,
  Link,
  Strikethrough,
  Underline,
} from "lucide-react";

export type SelectionMenuType = "link" | null;

const SelectionMenu = ({
  editor,
  selectionType,
  setSelectionType,
}: {
  editor: Editor;
  selectionType: SelectionMenuType;
  setSelectionType: (type: SelectionMenuType) => void;
}) => {
  // TODO: 정렬 (start | middle | end) , text background color
  switch (selectionType) {
    case null:
      return (
        <>
          <input
            type="color"
            value={editor.getAttributes("textStyle").color ?? "#000000"}
            data-testid="setColor"
            onInput={(event) =>
              editor
                .chain()
                .focus()
                .setColor((event.target as HTMLInputElement).value)
                .run()
            }
          ></input>
          <button
            type="button"
            data-test-id="mark-bold"
            className={clsx({
              active: editor.isActive("bold"),
            })}
            onClick={() => editor.chain().toggleBold().run()}
          >
            <Bold />
          </button>
          <button
            type="button"
            data-test-id="mark-italic"
            className={clsx({
              active: editor.isActive("italic"),
            })}
            onClick={() => editor.chain().toggleItalic().run()}
          >
            <Italic />
          </button>
          <button
            type="button"
            data-test-id="mark-underline"
            className={clsx({
              active: editor.isActive("underline"),
            })}
            onClick={() => editor.chain().toggleUnderline().run()}
          >
            <Underline />
          </button>
          <button
            type="button"
            data-test-id="mark-strike"
            className={clsx({
              active: editor.isActive("strike"),
            })}
            onClick={() => editor.chain().toggleStrike().run()}
          >
            <Strikethrough />
          </button>

          <button
            type="button"
            data-test-id="mark-link"
            className={clsx({
              active: editor.isActive("link"),
            })}
            onClick={() => {
              setSelectionType("link");
            }}
          >
            <Link />
          </button>
        </>
      );
    case "link":
      const previousUrl = editor.getAttributes("link").href;
      return (
        <div className="insert-link-box">
          <input
            data-test-id="insert-link-value"
            autoFocus
            type="text"
            placeholder="Insert link address"
            value={previousUrl}
            onChange={() => {}}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                if ((event.target as HTMLInputElement).value !== "") {
                  editor
                    .chain()
                    .focus()
                    .extendMarkRange("link")
                    .setLink({
                      href: setHref((event.target as HTMLInputElement).value),
                      target: "_blank",
                    })
                    .run();
                }
              }
              setSelectionType(null);

              console.log(event);
            }}
          />
        </div>
      );
  }
};

export default SelectionMenu;

function setHref(url: string) {
  const regExp = /^https?:\/\//;
  const hasHttp = regExp.test(url);
  return hasHttp ? url : "https://" + url;
}

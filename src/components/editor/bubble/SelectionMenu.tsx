import { Editor } from "@tiptap/react";
import clsx from "clsx";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
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
  switch (selectionType) {
    case null:
      return (
        <>
          <button
            type="button"
            data-test-id="mark-align-left"
            className={clsx({
              active: editor.isActive({ textAlign: "left" }),
            })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft size={16} />
          </button>
          <button
            type="button"
            data-test-id="mark-align-center"
            className={clsx({
              active: editor.isActive({ textAlign: "center" }),
            })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter size={16} />
          </button>
          <button
            type="button"
            data-test-id="mark-align-right"
            className={clsx({
              active: editor.isActive({ textAlign: "right" }),
            })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight size={16} />
          </button>

          <button
            type="button"
            data-test-id="mark-bold"
            className={clsx({
              active: editor.isActive("bold"),
            })}
            onClick={() => editor.chain().toggleBold().run()}
          >
            <Bold size={16} />
          </button>
          <button
            type="button"
            data-test-id="mark-italic"
            className={clsx({
              active: editor.isActive("italic"),
            })}
            onClick={() => editor.chain().toggleItalic().run()}
          >
            <Italic size={16} />
          </button>
          <button
            type="button"
            data-test-id="mark-underline"
            className={clsx({
              active: editor.isActive("underline"),
            })}
            onClick={() => editor.chain().toggleUnderline().run()}
          >
            <Underline size={16} />
          </button>
          <button
            type="button"
            data-test-id="mark-strike"
            className={clsx({
              active: editor.isActive("strike"),
            })}
            onClick={() => editor.chain().toggleStrike().run()}
          >
            <Strikethrough size={16} />
          </button>

          <button
            type="button"
            data-test-id="mark-code"
            className={clsx({
              active: editor.isActive("code"),
            })}
            onClick={() => editor.chain().toggleCode().run()}
          >
            <Code size={16} />
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
            <Link size={16} />
          </button>
          <input
            type="color"
            value={editor.getAttributes("textStyle").color ?? "#000000"}
            className="w-6 h-6"
            data-testid="setColor"
            onInput={(event) =>
              editor
                .chain()
                .focus()
                .setColor((event.target as HTMLInputElement).value)
                .run()
            }
          ></input>
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

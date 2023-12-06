import { schema } from "@tiptap/pm/markdown";
import { DOMParser } from "@tiptap/pm/model";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Extension } from "@tiptap/react";

const IMAGE_TYPES = ["image/svg+xml", "image/png", "image/jpeg", "image/gif"];
const ImageHandler = Extension.create({
  name: "image-handler",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("image-handler"),
        props: {
          handleDOMEvents: {
            drop: (view, event) => {
              if (event.dataTransfer) {
                let fileList = event.dataTransfer.files;

                if (fileList.length === 0) {
                  return;
                }
                event.preventDefault();

                const files: File[] = Array.from(fileList);

                files.forEach((file) => {
                  if (!IMAGE_TYPES.includes(file.type)) {
                    return;
                  }

                  const reader = new FileReader();

                  reader.onload = function (e) {
                    if (!e.target) return;

                    const img = document.createElement("img");
                    img.src = e.target.result as string;
                    img.alt = file.name;

                    const imageNode = view.state.schema.nodes.image.create({
                      src: e.target.result as string,
                    });
                    let pos = view.posAtCoords({
                      left: event.clientX,
                      top: event.clientY,
                    });
                    if (pos) {
                      view.dispatch(
                        view.state.tr.replaceWith(pos.pos, pos.pos, imageNode)
                      );
                    }
                  };

                  reader.readAsDataURL(file);
                });
              }
            },
          },
        },
      }),
    ];
  },
});

export default ImageHandler;

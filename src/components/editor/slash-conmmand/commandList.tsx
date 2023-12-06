import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import tippy from "tippy.js";

interface CommandItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

// tippy 안에 그려지는 리스트 UI와 UI 관련 비즈니스 로직
export const CommandList = ({
  items,
  command,
}: {
  items: CommandItemProps[];
  command: any;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const commandListContainer = useRef<HTMLDivElement>(null);
  const selectedButtonRef = useRef<HTMLButtonElement>(null);

  const selectItem = useCallback(
    (index: number) => {
      const item = items[index];
      if (item) {
        command(item);
      }
    },
    [command, items]
  );

  useEffect(() => {
    const navigationKeys = ["ArrowUp", "ArrowDown", "Enter", "Escape"];
    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault();
        if (e.key === "ArrowUp") {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length);
          return true;
        }
        if (e.key === "ArrowDown") {
          setSelectedIndex((selectedIndex + 1) % items.length);
          return true;
        }
        if (e.key === "Enter") {
          selectItem(selectedIndex);
          return true;
        }

        if (e.key === "Escape") {
          const body = document.querySelector("body");
          const tiptap = document.querySelector(".tiptap");
          // @ts-ignore
          body._tippy.hide();
          // @ts-ignore
          tiptap?.focus();
          return true;
        }
        return false;
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [items, selectedIndex, setSelectedIndex, selectItem]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  useEffect(() => {
    const container = commandListContainer.current;
    const item = selectedButtonRef.current;

    if (item && container) {
      container.scrollTop = item.offsetTop - container.offsetTop;

      item.focus();
    }

    if (selectedIndex === 0 && items.length > 0) {
      setTimeout(() => {
        selectedButtonRef.current?.focus();
      }, 10);
    }
  }, [selectedIndex, items]);

  return items.length > 0 ? (
    <div
      ref={commandListContainer}
      className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto scroll-smooth rounded-md border border-gray-200 bg-white px-1 py-2 shadow-md transition-all"
    >
      {items.map((item: CommandItemProps, index: number) => {
        const isSelected = index === selectedIndex;
        return (
          <button
            ref={isSelected ? selectedButtonRef : null}
            className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm text-gray-900 hover:bg-gray-100 mb-1 ${
              isSelected ? "bg-gray-100 text-gray-900" : ""
            }`}
            key={index}
            onClick={() => selectItem(index)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white ">
              {item.icon}
            </div>
            <div className="m-0 p-0">
              <p className="font-medium e m-0 p-0">{item.title}</p>
              <p className="text-xs text-gray-500 e m-0 p-0">
                {item.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  ) : null;
};

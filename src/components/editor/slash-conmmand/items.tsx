import { Editor, Range } from "@tiptap/react";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  MessageSquarePlus,
  Text,
  Quote,
  TextQuote,
  Minus,
} from "lucide-react";

interface Command {
  editor: Editor;
  range: Range;
}

// 슬래시 커맨드 리스트에 포함하고싶은 옵션 리스트
export const getSuggestionItems = ({ query }: { query: string }) => {
  return [
    {
      title: "텍스트",
      description: "일반 텍스트를 사용해 쓰기를 시작하세요",
      icon: <Text size={18} />,
      command: ({ editor, range }: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode("paragraph", "paragraph")
          .run();
      },
    },
    {
      title: "제목 1",
      description: "섹션 제목(대)",
      icon: <Heading1 size={18} />,
      command: ({ editor, range }: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 1 })
          .run();
      },
    },
    {
      title: "제목 2",
      description: "섹션 제목(중)",
      icon: <Heading2 size={18} />,
      command: ({ editor, range }: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 2 })
          .run();
      },
    },
    {
      title: "제목 3",
      description: "섹션 제목(소)",
      icon: <Heading3 size={18} />,
      command: ({ editor, range }: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 3 })
          .run();
      },
    },
    {
      title: "글머리 기호 목록",
      description: "간단한 글머리 기호 목록을 생성하세요.",
      icon: <List size={18} />,
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: "번호 매기기 목록",
      description: "번호가 매겨진 목록을 생성하세요.",
      icon: <ListOrdered size={18} />,
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: "인용",
      description: "인용문을 작성하세요.",
      icon: <TextQuote size={18} />,
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).setBlockquote().run();
      },
    },
    {
      title: "콜아웃",
      description: "돋보이는 글을 작성하세요.",
      icon: <Quote size={18} />,
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).setCodeBlock().run();
      },
    },
    {
      title: "구분선",
      description: "블록을 시각적으로 나눕니다.",
      icon: <Minus size={18} />,
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).setHorizontalRule().run();
      },
    },
  ].filter((item) => {
    if (typeof query === "string" && query.length > 0) {
      return item.title.toLowerCase().includes(query.toLowerCase());
    }
    return true;
  });
  // .slice(0, 10);
};

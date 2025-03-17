import React, { useState, useRef, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Heading from "@tiptap/extension-heading";
import Color from "@tiptap/extension-color";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { IoIosColorPalette } from "react-icons/io";
import ImageServer from "./ImageServer";
import { Link } from "@tiptap/extension-link";
import { FaLink } from "react-icons/fa";
import Paragraph from "@tiptap/extension-paragraph";

const Editor = ({
  onContentChange,
  initialContent = "",
  folder = "",
}: {
  onContentChange: (content: string) => void;
  initialContent?: string;
  folder: string;
}) => {
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);
  const colorPickerRef = useRef(null);
  const colorButtonRef = useRef(null);

  const listDropdownRef = useRef<HTMLDivElement>(null);
  const listButtonRef = useRef(null);
  const [isListOpen, setIsListOpen] = useState(false);

  const handleClickOutside = (e: any) => {
    if (
      colorPickerRef.current &&
      !(colorPickerRef.current as HTMLElement).contains(e.target) &&
      colorButtonRef.current &&
      !(colorButtonRef.current as HTMLElement).contains(e.target)
    ) {
      setColorPickerOpen(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Image.configure({
        HTMLAttributes: {
          class: "my-4",
        },
      }),
      Bold,
      Italic,
      Underline,
      TextStyle,
      Color,
      Heading.configure({
        levels: [1, 2, 3],
        HTMLAttributes: {
          class: "font-bold my-4 text-2xl text-black",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-6",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-6",
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: " ml-6",
        },
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: "text-lg text-black",
        },
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "min-h-[300px] p-2 border",
      },
    },
  });

  const handleImageSelect = (imageUrl: string) => {
    const fullImageUrl = process.env.NEXT_PUBLIC_SERVER + imageUrl;
    editor?.chain().focus().setImage({ src: fullImageUrl }).run();
  };

  const handleTextColorChange = (color: string) => {
    editor?.chain().focus().setMark("textStyle", { color }).run();
    setColorPickerOpen(false);
  };

  const toggleColorPicker = (e: React.MouseEvent) => {
    e.stopPropagation();
    setColorPickerOpen((prev) => !prev);
  };

  const handleAddLink = () => {
    const url = prompt("Nhập URL:");
    if (!url) return;
    const text = prompt("Nhập văn bản hiển thị:");
    if (!text) return;

    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .insertContent(`<a href="${url}" target="_blank">${text}</a>`)
      .run();
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="toolbar flex space-x-4 mb-4 items-center sticky top-0 bg-white z-10 p-2 shadow-md">
        <ImageServer folder={folder} handleImageSelect={handleImageSelect} />

        {/* Bold */}
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="p-2 border rounded hover:bg-gray-200"
        >
          B
        </button>

        {/* Italic */}
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className="p-2 border rounded hover:bg-gray-200"
        >
          I
        </button>

        {/*Underline */}
        <button
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className="p-2 border rounded hover:bg-gray-200"
        >
          U
        </button>

        {/* List (Bullet List & Ordered List) */}
        <div className="relative">
          {/* Select Dropdown */}
          <select
            onClick={() => setIsListOpen((prev) => !prev)}
            onChange={(e) => {
              if (e.target.value === "bullet") {
                editor?.chain().focus().toggleBulletList().run();
              } else if (e.target.value === "ordered") {
                editor?.chain().focus().toggleOrderedList().run();
              }
              setIsListOpen(false);
            }}
            className="p-2 border rounded hover:bg-gray-200"
          >
            <option value="" hidden>
              📋
            </option>
            <option value="bullet">•</option>
            <option value="ordered">1.</option>
          </select>
        </div>

        {/* Link Button */}
        <button
          onClick={handleAddLink}
          className="p-2 border rounded hover:bg-gray-200"
        >
          <FaLink />
        </button>

        {/* color */}
        <div className="relative">
          <button
            ref={colorButtonRef}
            onClick={toggleColorPicker}
            className="p-2 border rounded h-10"
          >
            <IoIosColorPalette />
          </button>
          {isColorPickerOpen && (
            <div
              ref={colorPickerRef}
              className="absolute left-0  flex space-x-2"
            >
              <button
                onClick={() => handleTextColorChange("#000000")}
                style={{ backgroundColor: "#000000", color: "white" }}
                className="p-2 border rounded"
              ></button>
              <button
                onClick={() => handleTextColorChange("#008000")}
                style={{ backgroundColor: "#008000", color: "white" }}
                className="p-2 border rounded"
              ></button>
              <button
                onClick={() => handleTextColorChange("#0000FF")}
                style={{ backgroundColor: "#0000FF", color: "white" }}
                className="p-2 border rounded"
              ></button>
              <button
                onClick={() => handleTextColorChange("red")}
                style={{ backgroundColor: "red", color: "white" }}
                className="p-2 border rounded"
              ></button>
            </div>
          )}
        </div>

        {/*  H1, H2, H3 */}
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="p-2 border rounded hover:bg-gray-200"
        >
          H1
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="p-2 border rounded hover:bg-gray-200"
        >
          H2
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className="p-2 border rounded hover:bg-gray-200"
        >
          H3
        </button>
        <button
          onClick={() => editor?.chain().focus().setParagraph().run()}
          className="p-2 border rounded hover:bg-gray-200"
        >
          p
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;

import React, { useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Heading from "@tiptap/extension-heading";
import Color from "@tiptap/extension-color";
import { IoIosColorPalette } from "react-icons/io";
import ImageServer from "./ImageServer";

const Editor = ({
  onContentChange,
}: {
  onContentChange: (content: string) => void;
}) => {
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);
  const colorPickerRef = useRef(null);
  const colorButtonRef = useRef(null);

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
      Image,
      Bold,
      Italic,
      Underline,
      TextStyle,
      Color,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "min-h-[300px] p-2 border", // Đặt chiều cao tối thiểu và padding
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

  return (
    <div>
      {/* Toolbar */}
      <div className="toolbar flex space-x-4 mb-4 items-center">
        <ImageServer handleImageSelect={handleImageSelect} />

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

        {/*  P */}
        <button
          onClick={() => editor?.chain().focus().setParagraph().run()}
          className="p-2 border rounded hover:bg-gray-200"
        >
          P
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;

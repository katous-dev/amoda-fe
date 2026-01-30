"use client";
import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Box } from "@mui/material";

export default function Editor({
  value,
  onChange,
  placeholder,
  onImageUpload,
}) {
  const { quill, quillRef } = useQuill({
    placeholder,
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }, { size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["link", "image", "video", "code-block"],
        ["clean"],
      ],
    },
  });

  useEffect(() => {
    if (quill) {
      if (value && quill.root.innerHTML !== value) {
        quill.clipboard.dangerouslyPasteHTML(value);
      }

      quill.getModule("toolbar").addHandler("image", async () => {
        if (onImageUpload) {
          const url = await onImageUpload();
          if (url) {
            const range = quill.getSelection();
            quill.insertEmbed(range.index, "image", url);
            quill.setSelection(range.index + 1);
          }
        }
      });

      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        onChange(html);
      });
    }
  }, [quill, onImageUpload]);

  useEffect(() => {
    if (quill && (value === "" || value === "<p><br></p>")) {
      if (quill.root.innerHTML !== "") {
        quill.setContents([]);
      }
    }
  }, [value, quill]);

  return (
    <Box
      sx={{
        minHeight: "300px",
        "& .ql-container": { minHeight: "250px", fontSize: "16px" , width: "100%" },
      }}
    >
      <div ref={quillRef} />
    </Box>
  );
}

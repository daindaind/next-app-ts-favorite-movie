'use client'

import { useEffect, useRef } from "react";

interface TextInputProps {
   placeholder: string;
   onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextInput = ({ placeholder, onChange }: TextInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const handleInput = () => {
   if (textareaRef && textareaRef.current){
         const textarea = textareaRef.current;
         textarea.style.height = "auto";
         textarea.style.height = `${textarea.scrollHeight}px`;
      }
   }

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener("input", handleInput);
      return () => {
        textarea.removeEventListener("input", handleInput);
      };
    }
  }, []);

  return (
    <textarea
      cols={3}
      className="resize-none border-2 text-sm border-stone-200 rounded-lg p-3 h-full overflow-scroll overflow-x-hidden focus:outline-none"
      ref={textareaRef}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default TextInput;

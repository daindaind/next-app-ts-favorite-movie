'use client';

import { useEffect, useRef } from "react";

interface TextInputProps {
  	name: string;
   placeholder: string;
   onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	defaultValue?: string;
}

const TextInput = ({ defaultValue, placeholder, onChange, name }: TextInputProps) => {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const handleInput = () => {
		if (textareaRef && textareaRef.current){
			const textarea = textareaRef.current;
			textarea.style.height = "auto";
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	};

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
			name={name}
			cols={3}
			className="bg-white resize-none border-2 text-sm border-stone-200 rounded-lg p-3 h-full overflow-scroll overflow-x-hidden focus:outline-none"
			ref={textareaRef}
			placeholder={placeholder}
			onChange={onChange}
			defaultValue={defaultValue}
		/> 
	);
};

export default TextInput;

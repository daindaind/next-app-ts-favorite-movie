import { SetStateAction, useRef, useState } from "react";

const useImagePick = () => {
  const [imgUrl, setImgUrl] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const handleButtonClick = ( ) => {
    if (fileInput && fileInput.current) {
      fileInput?.current.click();
    
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setImgUrl(reader.result as SetStateAction<string>);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return { imgUrl, handleButtonClick, handleImageUpload, fileInput };
};

export default useImagePick;

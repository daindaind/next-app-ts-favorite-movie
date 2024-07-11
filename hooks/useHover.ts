import { useRef, useState } from "react";

const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return { isHovered, ref, handleMouseEnter, handleMouseLeave };
};

export default useHover;
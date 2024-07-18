import { COLORS } from "@/constants/color";
import { COLOR_DTO } from "@/types/dto";

export default function getColors(color: COLOR_DTO) {
   const movieColorData = COLORS.filter(item => item.name === color);
   const movieColor = movieColorData[0].color;

   return movieColor;
}
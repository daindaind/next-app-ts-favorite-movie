'use client'

interface ButtomProps {
   label: string;
   onClick?: (e: any) => void;
   type?: "button" | "submit" | "reset";
}

const Button = ({ label, onClick, type }: ButtomProps) => {
   return (
     <button
       className="p-2 bg-cherry-pink border-none rounded-md transition ease-in delay-75 hover:cursor-pointer hover:scale-90 transform-gpu"
       onClick={onClick}
       type={type}
     >
       <p className="bg-cherry-pink text-light-white text-sm">{label}</p>
     </button>
   );
 };
 
 export default Button;
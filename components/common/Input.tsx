
interface InputProps {
   value?: string;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   placeholder: string;
   type?: string;
   name?: string;
}

const Input = ({ value, onChange, placeholder, type, name }: InputProps) => {
   return (
     <input
       value={value}
       onChange={onChange}
       placeholder={placeholder}
       type={type}
       name={name}
       className="w-full bg-white border-2 border-stone-200 rounded-lg p-2 text-sm focus:outline-none"
     />
   );
 };
 
 export default Input;
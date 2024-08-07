
interface InputProps {
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	type?: string;
	name?: string;
	defaultValue?: any;
	disabled?: boolean;
}

const Input = ({ disabled, defaultValue, value, onChange, placeholder, type, name }: InputProps) => {
	return (
		<input
			disabled={disabled}
			value={value}
			defaultValue={defaultValue}
			onChange={onChange}
			placeholder={placeholder}
			type={type}
			name={name}
			className="w-full bg-white border-2 border-stone-200 rounded-lg p-2 text-sm focus:outline-none disabled:bg-stone-100 disabled:text-stone-500"
		/>
	);
};
 
export default Input;
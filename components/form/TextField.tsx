import Input from "./Input"
import Label from "./Label"

type TextFieldProps = {
  value: string;
  name: string;
  label?: string;
  placeholder?: string;
  onChange: (value: string, name: string) => void;
  type?: 'text' | 'email';
  required?: boolean;
  autoFocus?: boolean;
}

const TextField = ({ value, name, onChange, label, placeholder, type="text", required=false, autoFocus=false }: TextFieldProps) => {
  return (
    <div className="my-4">
      { label && <Label htmlFor={name} text={label} className="block text-sm" /> }
      <input
        type={type}
        onChange={({ target: { value }}) => onChange && onChange(value, name)}
        name={name}
        id={name}
        value={value}
        required={required}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className="py-2 px-3 mt-2 rounded-md w-full" />
    </div>
  )
}

export default TextField;
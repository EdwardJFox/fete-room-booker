import Label from "./Label"

type TextFieldProps = {
  value: string;
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  onChange: (value: string, name: string) => void;
  type?: 'text' | 'email';
  required?: boolean;
  autoFocus?: boolean;
  max?: number;
}

const TextField = ({
  value,
  name,
  onChange,
  label,
  placeholder,
  className,
  max,
  type="text",
  required=false,
  autoFocus=false,
}: TextFieldProps) => {
  return (
    <div className={`${className || ""}`}>
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
        className="py-2 px-3 mt-2 rounded-md w-full"
        maxLength={max} />
    </div>
  )
}

export default TextField;
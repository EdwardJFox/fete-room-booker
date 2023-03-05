type InputProps = {
  type?: string;
  value: string;
  name: string;
  onChange?: (value: string, name: string) => void;
  disabled?: boolean;
  checked?: boolean;
  className?: string;
}

const Input = ({ type="text", value, onChange, name, disabled=false, checked, className }: InputProps) => {
  return (
    <input
      className={`bg-slate-200 ${className || ""}`}
      type={type}
      value={value}
      checked={checked}
      id={name}
      name={name}
      onChange={({ target: { value }}) => onChange && onChange(value, name)}
      disabled={disabled} />
  )
}

export default Input;
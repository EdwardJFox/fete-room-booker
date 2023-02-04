type InputProps = {
  type?: string;
  value: string;
  name: string;
  onChange?: (value: string, name: string) => void;
  disabled?: boolean;
  checked?: boolean;
}

const Input = ({ type="text", value, onChange, name, disabled=false, checked }: InputProps) => {
  return (
    <input
      className="bg-slate-200"
      type={type}
      value={value}
      checked={checked}
      id={name}
      name={name}
      onChange={({ target: { value }}) => onChange && onChange(value, name)} />
  )
}

export default Input;
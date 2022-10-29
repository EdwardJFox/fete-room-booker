type InputProps = {
  type?: string;
  value: string;
  name: string;
  onChange?: (value: string, name: string) => void;
  disabled?: boolean;
}

const Input = ({ type="text", value, onChange, name, disabled=false }: InputProps) => {
  return (
    <input
      className="bg-slate-200"
      type={type}
      value={value}
      id={name}
      name={name}
      onChange={({ target: { value }}) => onChange && onChange(value, name)} />
  )
}

export default Input;
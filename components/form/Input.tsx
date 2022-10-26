type InputProps = {
  type: string;
  value: string;
  name: string;
  onChange: (value: string, name: string) => void; 
}

const Input = ({ type, value, onChange, name }: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      id={name}
      name={name}
      onChange={({ target: { value }}) => onChange(value, name)} />
  )
}

export default Input;
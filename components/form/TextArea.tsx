import Label from "./Label"

type TextAreaProps = {
  value: string;
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  onChange: (value: string, name: string) => void;
}

const TextArea = ({
  value,
  name,
  onChange,
  label,
  placeholder,
  className,
}: TextAreaProps) => {
  return (
    <div className={`${className || ""}`}>
      { label && <Label htmlFor={name} text={label} className="block text-sm" /> }
      <textarea
        onChange={({ target: { value }}) => onChange && onChange(name, value)}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        className="py-2 px-3 mt-1 rounded-md w-full" />
    </div>
  )
}

export default TextArea;
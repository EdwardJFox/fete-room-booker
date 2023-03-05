import Input from "./Input";
import Label from "./Label";

type InputProps = {
  value: string;
  name: string;
  label: string;
  checked: boolean;
  onChange?: (value: string, name: string) => void;
}

const Radio = ({ value, onChange, name, label, checked }: InputProps) => {
  return (
    <div className="inline-flex items-center mr-3">
      <Input
        type="radio"
        value={value}
        name={`${name}_${value}`}
        checked={checked}
        onChange={() => onChange && onChange(name, value)}
        className="w-4 h-4 mr-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-600" />
      <Label
        htmlFor={`${name}_${value}`}
        text={label} />
    </div>
  )
}

export default Radio;

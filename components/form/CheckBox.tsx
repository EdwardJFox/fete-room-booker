import Input from "./Input";
import Label from "./Label";

type InputProps = {
  value: string;
  name: string;
  label: string;
  checked: boolean;
  onChange?: (value: boolean, name: string) => void;
}

const CheckBox = ({ value, onChange, name, label, checked }: InputProps) => {
  return (
    <div className="inline-flex items-center mr-3">
      <Input
        type="checkbox"
        value={value}
        name={name}
        checked={checked}
        onChange={() => onChange && onChange(!checked, name)}
        className="w-4 h-4 mr-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-600" />
      <Label
        htmlFor={name}
        text={label} />
    </div>
  )
}

export default CheckBox;
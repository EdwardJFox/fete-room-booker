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
    <>
      <Input
        type="radio"
        value={value}
        name={`${name}_${value}`}
        checked={checked}
        onChange={() => onChange && onChange(name, value)} />
      <Label
        htmlFor={`${name}_${value}`}
        text={label} />
    </>
  )
}

export default Radio;
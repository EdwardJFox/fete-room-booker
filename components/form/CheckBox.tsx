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
    <>
      <Input
        type="checkbox"
        value={value}
        name={name}
        checked={checked}
        onChange={() => onChange && onChange(!value, name)} />
      <Label
        htmlFor={name}
        text={label} />
    </>
  )
}

export default CheckBox;
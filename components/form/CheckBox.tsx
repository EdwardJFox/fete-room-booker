import Input from "./Input";
import Label from "./Label";

type InputProps = {
  value: boolean;
  name: string;
  label: string;
  onChange?: (value: boolean, name: string) => void;
}

const CheckBox = ({ value, onChange, name, label }: InputProps) => {
  return (
    <>
      <Input
        type="checkbox"
        value={value}
        name={name}
        onChange={() => onChange && onChange(!value, name)} />
      <Label
        htmlFor={name}
        text={label} />
    </>
  )
}

export default CheckBox;
import Input from "./Input"
import Label from "./Label"

type TextFieldProps = {
  value: string;
  name: string;
  label: string;
  onChange: (value: string, name: string) => void; 
}

const TextField = ({ value, name, onChange, label }: TextFieldProps) => {
  return (
    <div className="">
      <Label htmlFor={name} text={label} />
      <Input type="text" onChange={onChange} name={name} value={value} />
    </div>
  )
}

export default TextField;
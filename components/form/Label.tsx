type LabelProps = {
  htmlFor: string;
  text: string
}

const Label = ({ htmlFor, text }: LabelProps) => {
  return (
    <label htmlFor={htmlFor}>{ text }</label>
  )
}

export default Label;
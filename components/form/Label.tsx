type LabelProps = {
  htmlFor: string;
  text: string
  className?: string
}

const Label = ({ htmlFor, text, className }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={`${className}`}>{ text }</label>
  )
}

export default Label;
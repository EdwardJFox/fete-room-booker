type GroupHeaderProps = {
  name: string
}

const GroupHeader = ({ name }: GroupHeaderProps) => {

  return (
    <div className="py-3">
      <h1 className="inline">{ name }</h1>
    </div>
  )
}

export default GroupHeader;
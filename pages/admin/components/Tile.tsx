type TileProps = {
  label: string;
  value: number | string;
}

const Tile = ({ label, value }: TileProps) => {
  return (
    <div className="bg-secondary-600 rounded-md p-4 h-28 flex flex-col justify-between">
      <h3 className="text-xl">{ label }</h3>
      <h3 className="text-3xl">{ value }</h3>
    </div>
  )
}

export default Tile;

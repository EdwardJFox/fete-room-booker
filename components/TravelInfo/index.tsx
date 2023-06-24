import { format, parseISO } from 'date-fns'

import { Prisma } from "@prisma/client";
import { faBus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TravelInfoProps = {
  travel: Prisma.TravelGetPayload<{
    include: {
      to: true,
      from: true,
    }
  }> | null;
}

type TravelInfoEntryProps = {
  title: string;
  location: string;
  address: string;
  time: string | Date;
}

const TravelInfoEntry = ({ title, location, address, time }: TravelInfoEntryProps) => {
  const date = parseISO(time as unknown as string)

  return (
    <div className="flex items-center">
      <div className="p-2 rounded-full bg-white flex items-center justify-center h-10 w-10">
        <FontAwesomeIcon
          icon={faBus}
          className="text-secondary"
          height={20}
          width={20} />
      </div>
      <div className="flex-1 ml-4">
        <h3 className="text-xl">{title}</h3>
        <p className="mt-1 mb-2"><strong>{location}</strong> on {format(date, "eeee LLLL do 'at' HH:mmaaa")}</p>
        <p className="text-sm">{address}</p>
      </div>
    </div>
  )
}

const TravelInfo = ({ travel }: TravelInfoProps) => {
  if (!travel) return null;

  return (
    <div className="my-4 px-6 py-5 bg-secondary-600 rounded-md">
      <h2>Travel</h2>
      <p className="mb-3 mt-1">You have been booked on the following coaches:</p>
      <TravelInfoEntry
        title="Departure"
        location={travel.from.name}
        address={travel.from.address}
        time={travel.departTime}
      />
      <div className="h-10 border-dashed border-l-2 border-white ml-5" />
      <TravelInfoEntry
        title="Return"
        location={travel.to.name}
        address={travel.to.address}
        time={travel.returnTime}
      />
    </div>
  )
}

export default TravelInfo;

import { sendEmail } from "../lib/email";
import prisma from "../lib/prismadb"
import { getParticipants } from "./startgg/getParticipants";

const getAllParticipants = async () => {
  const initialData = await getParticipants(process.env.START_GG_TOURNAMENT, 1, 10)
  const totalPages = Math.ceil(initialData.data.tournament.participants.pageInfo.total / 100);

  let allParticipants = initialData.data.tournament.participants.nodes

  for(let i = 1; i < totalPages; i++) {
    const data = await getParticipants(process.env.START_GG_TOURNAMENT, i, 10)
    allParticipants = [...allParticipants, ...data.data.tournament.participants.nodes]
  }

  return allParticipants;
}

export const createAccounts = async () => {
  const allParticipants = await getAllParticipants();

  allParticipants.forEach(async (participant) => {
    if (participant.email) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: participant.email
        }
      })

      if (existingUser === null) {
        const newUser = await prisma.user.create({
          data: {
            email: participant.email,
            name: participant.player.gamerTag,
            image: participant.user.images[0].url
          },
        })

        if (process.env.NODE_ENV !== "production" && newUser) {
          sendEmail(
            participant.email,
            "Room Booking now available",
            "Room booking is now available!",
            `
              <a href="http://localhost:3000">Login now!</a>
            `
          )
        }
        // Send email here
      }
    }
  })
}
import { ImportLogStatus, UserImportLogStatus } from "@prisma/client";
import { sendEmail } from "../lib/email";
import prisma from "../lib/prismadb"
import { getParticipants } from "./startgg/getParticipants";
import { signupEmailTemplate } from "./signupEmailTemplate";
// const fs = require('fs');

const getAllParticipants = async () => {
  const initialData = await getParticipants(process.env.START_GG_TOURNAMENT!, 1, 200)
  const totalPages = Math.ceil(initialData.data.tournament.participants.pageInfo.total / 200);

  let allParticipants = initialData.data.tournament.participants.nodes

  for(let i = 2; i <= totalPages; i++) {
    const data = await getParticipants(process.env.START_GG_TOURNAMENT!, i, 200)
    allParticipants = [...allParticipants, ...data.data.tournament.participants.nodes]
  }

  return allParticipants;
}

export const createAccounts = async () => {
  let hadError = false;
  const allParticipants = await getAllParticipants();

  const importLog = await prisma.importLog.create({
    data: {
      content: allParticipants,
      status: ImportLogStatus.IN_PROGRESS,
      numberOfRecords: allParticipants.length,
    }
  });

  // fs.writeFileSync(`participants_${Date.now()}.json`, JSON.stringify(allParticipants, null, 2));

  for (const participant of allParticipants) {
    if (participant.email) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: participant.email
        }
      })
  
      if (existingUser === null) {
        try {
          const newUser = await prisma.user.create({
            data: {
              email: participant.email,
              name: participant.player.gamerTag,
              image: participant?.user?.images[0]?.url || null
            },
          });

          if (newUser) {
            sendEmail(
              // participant.email,
              "edwardjfox@outlook.com",
              "Room Booking now available",
              "Room booking is now available!",
              signupEmailTemplate(process.env.NEXTAUTH_URL!),
            )
            await prisma.userImportLog.create({
              data: {
                importLogId: importLog.id,
                name: participant.player.gamerTag,
                email: participant.email,
                message: JSON.stringify(participant),
                status: UserImportLogStatus.NEW,
              }
            });
          }
        } catch (err: any) {
          hadError = true;
          await prisma.userImportLog.create({
            data: {
              importLogId: importLog.id,
              name: participant.player.gamerTag,
              email: participant.email,
              message: err.message,
              status: UserImportLogStatus.ERROR,
            }
          });
        }
      } else {
        await prisma.userImportLog.create({
          data: {
            importLogId: importLog.id,
            name: participant.player.gamerTag,
            email: participant.email,
            message: JSON.stringify(participant),
            status: UserImportLogStatus.SKIP,
          }
        });
      }
    } else {
      await prisma.userImportLog.create({
        data: {
          importLogId: importLog.id,
          name: participant.player.gamerTag,
          message: JSON.stringify(participant),
          status: UserImportLogStatus.NO_EMAIL,
        }
      });
    }
  }

  await prisma.importLog.update({
    where: {
      id: importLog.id
    },
    data: {
      status: hadError ? ImportLogStatus.ERROR : ImportLogStatus.COMPLETE,
    }
  });
}
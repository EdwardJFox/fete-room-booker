import { sendEmail } from "../lib/email";
import { PrismaClient } from '@prisma/client'
import { updateEmailTemplate } from "./updateEmailTemplate";

process.env.TZ = 'Europe/London'

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany({
    where: {
      sentUpdateEmailAt: null,
      id: {
        gt: 305
      }
    },
    include: {
      preferences: true,
      groupMember: {
        include: {
          group: true,
        }
      },
      travel: {
        include: {
          from: true,
          to: true,
        }
      }
    },
    orderBy: [
      {
        id: 'asc'
      }
    ]
  });

  for (const user of users) {
    if (user.email) {
      await sendEmail(
        user.email,
        "Fete 3 is next weekend!",
        "Some information about your Fete 3 weekend.",
        updateEmailTemplate(user),
      )
  
      await prisma.user.update({
        where: {
          id: users[0].id,
        },
        data: {
          sentUpdateEmailAt: new Date(),
        }
      });
    }
  }
}

main();
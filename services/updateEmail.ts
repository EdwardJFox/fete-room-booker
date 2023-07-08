import { sendEmail } from "../lib/email";
import prisma from "../lib/prismadb"
import { updateEmailTemplate } from "./updateEmailTemplate";

process.env.TZ = 'Europe/London'

async function main() {
  const users = await prisma.user.findMany({
    where: {
      sentUpdateEmailAt: null
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
    await sendEmail(
      // user.email,
      "edwardjfox@outlook.com",
      "Fete 3 is next weekend!",
      "Some information about your Fete 3 weekend.",
      updateEmailTemplate(user),
      // updateEmailTemplate(users[0]),
    )

    // await prisma.user.update({
    //   where: {
    //     id: users[0].id,
    //   },
    //   data: {
    //     sentUpdateEmailAt: new Date(),
    //   }
    // });
  }
}

main();
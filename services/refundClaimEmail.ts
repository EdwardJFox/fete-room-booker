import { sendEmail } from "../lib/email";
import { PrismaClient } from '@prisma/client'
import { refundClaimEmailTemplate } from "./refundClaimEmailTemplate";

process.env.TZ = 'Europe/London'

const prisma = new PrismaClient()

async function main() {
  // We only want users on the late coach from London
  const users = await prisma.user.findMany({
    where: {
      sentTravelEmailAt: null,
      travel: {
        from: {
          name: 'London',
        },
        departTime: new Date(2023, 6, 13, 19, 30)
      }
    },
    include: {
      travel: {
        include: {
          from: true,
          to: true,
        }
      }
    },
  });
  console.log("users", users);
  console.log("users.length", users.length);
  for (const user of users) {
    if (user.email) {
      await sendEmail(
        user.email,
        // "edwardjfox@outlook.com",
        "Fete 3 - London 19:30 coach onward travel refund information",
        "Refund claim information for the London - 19:30 coach.",
        refundClaimEmailTemplate(),
      )
  
      await prisma.user.update({
        where: {
          id: users[0].id,
        },
        data: {
          sentTravelEmailAt: new Date(),
        }
      });
    }
  }
}

main();
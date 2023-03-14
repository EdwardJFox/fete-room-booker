import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from 'lib/prismadb';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions)

    if (session) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email as string
        }
      })

      if (user) {
        await prisma.groupMember.delete({
          where: {
            userId: user.id,
          },
        })

        res.status(200);
      } else {
        res.status(404).json({
          error: "User not found"
        })
      }
    } else {
      res.status(401).json({
        error: "Not signed in"
      })
    }
    res.end()
  }
}
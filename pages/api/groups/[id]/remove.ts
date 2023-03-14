import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from 'lib/prismadb';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions)

    if (session) {
      const body = JSON.parse(req.body)

      const currentUser = await prisma.user.findUnique({
        where: {
          email: session.user.email as string
        },
        include: {
          groupMember: true
        }
      })

      const userToRemove = await prisma.user.findUnique({ 
        where: {
          id: body.userId,
        },
        include: {
          groupMember: true
        }
      })

      if (
        // Slightly messy, but no harm in being super explicit in a remove endpoint
        currentUser &&
        currentUser.groupMember &&
        currentUser.groupMember.owner && 
        userToRemove &&
        userToRemove.groupMember &&
        !userToRemove.groupMember.owner &&
        userToRemove.groupMember.groupId === currentUser.groupMember.groupId) {
        await prisma.groupMember.delete({
          where: {
            userId: userToRemove.id,
          },
        })

        res.status(200)
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
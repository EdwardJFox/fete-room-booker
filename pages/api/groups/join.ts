import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import prisma from '../../../lib/prismadb';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (session) {
      const body = JSON.parse(req.body)

      if (!body.code) {
        return res.status(400).json({
          error: 'Code missing'
        })
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email
        },
        include: {
          groupMember: true
        }
      })

      const group = await prisma.group.findUnique({
        where: {
          code: body.code
        }
      })

      if (user?.groupMember) {
        res.status(500).json({
          error: "Already part of a group!"
        })
      } else if (user && group && !user.groupMember) {
        const groupMember = await prisma.groupMember.create({
          data: {
            userId: user.id,
            groupId: group.id,
            owner: false,
            approved: false
          }
        })

        res.status(201)
      } else {
        res.status(404).json({
          error: "Not found"
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
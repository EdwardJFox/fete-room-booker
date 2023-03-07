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

      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email
        }
      })

      if (user) {
        const code = Math.random().toString(36).substr(2, 7);

        const group = await prisma.group.create({
          data: {
            name: body.groupName,
            code,
            members: {
              create: [
                {
                  userId: user.id,
                  owner: true,
                  approved: true
                }
              ]
            }
          },
          include: {
            members: {
              include: {
                user: {
                  select: {
                    name: true,
                    image: true
                  }
                }
              }
            }
          }
        })

        res.status(200).json({
          group
        })
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
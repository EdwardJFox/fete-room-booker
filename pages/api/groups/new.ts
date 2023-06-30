import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from 'lib/prismadb';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(404);
  return res.end();

  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions)
    if (session) {
      const body = JSON.parse(req.body)

      if (body.groupName.length > 30) {
        return res.status(401).json({
          error: "Group name too long"
        });
      } else if (!body.groupName || body.groupName === "") {
        return res.status(401).json({
          error: "Group name missing"
        });
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email as string
        }
      });

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
        });

        res.status(200).json({
          group
        });
      } else {
        res.status(404).json({
          error: "User not found"
        });
      }
    } else {
      res.status(401).json({
        error: "Not signed in"
      });
    }
    res.end();
  }
}
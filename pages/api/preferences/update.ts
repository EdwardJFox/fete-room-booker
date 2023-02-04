import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import prisma from '../../../lib/prismadb';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PATCH') {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session) {
      const body = JSON.parse(req.body)

      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email
        }
      })

      if (user) {
        const preferencesExist = await prisma.preference.count({
          where: {
            userId: user.id,
          }
        })

        let preferences;

        if (!preferencesExist) {
          preferences = await prisma.preference.create({
            data: {
              typeOfRoom: body.userPreferences.typeOfRoom || null,
              dietary: body.userPreferences.dietary || null,
              user: {
                connect: {
                  id: user.id
                }
              }
            }
          });
        } else {
          preferences = await prisma.preference.update({
            where: {
              userId: parseInt(user.id),
            },
            data: {
              typeOfRoom: body.userPreferences.typeOfRoom,
              dietary: body.userPreferences.dietary,
            }
          });
        }

        res.status(200).json({
          preferences
        })
      } else {
        res.status(500).json({
          error: "An issue with preferences occurred"
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
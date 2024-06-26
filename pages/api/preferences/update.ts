import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import prisma from '../../../lib/prismadb';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(404);
  return res.end();

  if (req.method === 'PATCH') {
    const session = await getServerSession(req, res, authOptions)
    if (session) {
      const body = JSON.parse(req.body)

      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email as string
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
              comments: body.userPreferences.comments || null,
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
              userId: user.id,
            },
            data: {
              typeOfRoom: body.userPreferences.typeOfRoom,
              dietary: body.userPreferences.dietary,
              comments: body.userPreferences.comments,
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
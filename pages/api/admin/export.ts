import { stringify } from 'csv-stringify/sync';
import { NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import checkSession from 'middlewares/api/checkSession';
import isAdmin from 'middlewares/api/isAdmin';
import loadUser from 'middlewares/api/loadUser';
import { handlerOptions } from '../_default';
import prisma from "lib/prismadb"
import { RequestWithUser } from 'types/requests';

const router = createRouter<RequestWithUser, NextApiResponse>();

router
  .use(checkSession())
  .use(loadUser())
  .use(isAdmin())
  .get(async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        include: {
          preferences: true,
          groupMember: {
            include: {
              group: {
                select: {
                  name: true,
                  code: true
                }
              }
            }
          }
        }
      });

      const data: any = users.reduce((rows: any, user) => {
        rows.push({
          id: user.id,
          name: user.name,
          email: user.email,
          sentInviteAt: user.sentInviteEmailAt,
          emailVerifiedAt: user.emailVerified,
          groupCode: user.groupMember?.group.code,
          groupName: user.groupMember?.group.name,
          groupOwner: user.groupMember?.owner ? "Yes" : "No",
          groupApproved: user.groupMember?.approved ? "Yes" : "No",
          preferenceTypeOfRoom: user.preferences?.typeOfRoom,
          preferenceDietary: user.preferences?.dietary,
          preferenceComments: user.preferences?.comments,
        })
        return rows;
      }, []);

      const csvFile = stringify(data, { header: true })

      return res
        .status(200)
        .setHeader("Content-Type", "text/csv")
        .setHeader("Content-Disposition", `attachment; filename=fete_export.csv`)
        .send(csvFile);
    } catch (error) {
      res.status(400).json({ error });
    }
  })

export default router.handler(handlerOptions);
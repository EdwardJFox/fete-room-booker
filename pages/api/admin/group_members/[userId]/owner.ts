import { NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import checkSession from 'middlewares/api/checkSession';
import isAdmin from 'middlewares/api/isAdmin';
import loadUser from 'middlewares/api/loadUser';
import { handlerOptions } from '../../../_default';
import prisma from "lib/prismadb"
import { RequestWithUser } from 'types/requests';

const router = createRouter<RequestWithUser, NextApiResponse>();

router
  .use(checkSession())
  .use(loadUser())
  .use(isAdmin())
  .patch(async (req, res) => {
    const { userId } = req.query;
    const body = JSON.parse(req.body);

    if (!userId) {
      return res.status(400).json({ message: 'Error' })
    }

    await prisma.groupMember.update({
      where: {
        userId: parseInt(userId as string),
      },
      data: {
        owner: body.owner
      }
    })

    return res.status(200).end()
  })

export default router.handler(handlerOptions);
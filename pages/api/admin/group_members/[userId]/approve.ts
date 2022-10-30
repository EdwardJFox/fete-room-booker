import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import checkSession from '../../../../../middlewares/api/checkSession';
import isAdmin from '../../../../../middlewares/api/isAdmin';
import loadUser from '../../../../../middlewares/api/loadUser';
import { handlerOptions } from '../../../_default';
import prisma from "../../../../../lib/prismadb"

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(checkSession())
  .use(loadUser())
  .use(isAdmin())
  .patch(async (req, res) => {
    const { userId } = req.query;

    await prisma.groupMember.update({
      where: {
        userId: parseInt(userId),
      },
      data: {
        approved: true
      }
    })

    return res.status(200).end()
  })

export default router.handler(handlerOptions);
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import checkSession from '../../../../middlewares/api/checkSession';
import isAdmin from '../../../../middlewares/api/isAdmin';
import loadUser from '../../../../middlewares/api/loadUser';
import { handlerOptions } from '../../_default';
import prisma from "../../../../lib/prismadb"

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .use(checkSession())
  .use(loadUser())
  .use(isAdmin())
  .patch(async (req, res) => {
    const { id } = req.query;
    const body = JSON.parse(req.body);

    await prisma.group.update({ 
      where: {
        id: parseInt(id),
      },
      data: {
        name: body.name,
        code: body.code,
      }
    })

    return res.status(200).end()
  })

export default router.handler(handlerOptions);
import { NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import checkSession from 'middlewares/api/checkSession';
import isAdmin from 'middlewares/api/isAdmin';
import loadUser from 'middlewares/api/loadUser';
import { handlerOptions } from '../../_default';
import prisma from "lib/prismadb"
import { RequestWithUser } from 'types/requests';

const router = createRouter<RequestWithUser, NextApiResponse>();

router
  .use(checkSession())
  .use(loadUser())
  .use(isAdmin())
  .patch(async (req, res) => {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Error' })
    }
    
    const body = JSON.parse(req.body)

    if (!body.name || body.name === "") {
      return res.status(400).json({ error: "User must have a name/tag." })
    }

    await prisma.user.update({ 
      where: {
        id: parseInt(id as string),
      },
      data: {
        name: body.name,
        admin: body.admin,
        // travelId: body.travelId || null,
        travel: {
          ...(body.travelId ? { connect: { id: body.travelId } } : { disconnect: true })
        }
      }
    })

    return res.status(200).end()
  })

export default router.handler(handlerOptions);
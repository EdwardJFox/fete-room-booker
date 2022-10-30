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
  .post(async (req, res) => {
    const body = JSON.parse(req.body);

    const newUserToAdd = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })

    if (newUserToAdd && !isNaN(parseInt(body.groupId))) {
      const member = await prisma.groupMember.create({ 
        data: {
          groupId: parseInt(body.groupId),
          userId: newUserToAdd.id,
        },
        include: {
          user: true
        }
      })
  
      return res.status(201).json({
        member
      })
    } else {
      return res.status(404).end("Not found")
    }
  })

export default router.handler(handlerOptions);
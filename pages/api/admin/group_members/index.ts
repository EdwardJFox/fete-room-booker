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
      },
      include: {
        groupMember: true
      }
    })

    if (!newUserToAdd) {
      return res.status(404).json({
        error: "User not found."
      });
    }

    if (newUserToAdd.groupMember) {
      return res.status(400).json({
        error: "User already in a group, so can't be added."
      });
    }
    
    if (newUserToAdd && !isNaN(parseInt(body.groupId))) {
      const member = await prisma.groupMember.create({ 
        data: {
          groupId: parseInt(body.groupId),
          userId: newUserToAdd.id,
        },
        include: {
          user: true
        }
      });
  
      return res.status(201).json({
        member
      });
    } else {
      return res.status(500).json({
        error: "Something went wrong, try again later or contact support."
      })
    }
  })

export default router.handler(handlerOptions);
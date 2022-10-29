import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../lib/prismadb';

const loadUser = () => async (req: NextApiRequest, res: NextApiResponse, next) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.session.user.email
    },
    include: {
      groupMember: true
    }
  })

  if (user) {
    req.user = user;
    return next();
  } else {
    return res.status(404).end('User not found')
  }
}

export default loadUser;
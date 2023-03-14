import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../lib/prismadb';

const loadUser = () => async (req: NextApiRequest, res: NextApiResponse, next: any) => {
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
    return res.status(404).json({ error: 'User not found' })
  }
}

export default loadUser;
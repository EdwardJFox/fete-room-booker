import { NextApiRequest, NextApiResponse } from "next";
import prisma from 'lib/prismadb';
import { Session } from "next-auth";
import { Prisma } from "@prisma/client";

interface Request extends NextApiRequest {
  session: Session;
  user: Prisma.UserGetPayload<{
    include: {
      groupMember: true
    }
  }>;
}

const loadUser = () => async (req: Request, res: NextApiResponse, next: any) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.session.user.email!
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
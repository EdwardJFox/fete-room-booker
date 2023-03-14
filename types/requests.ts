import { Prisma } from "@prisma/client";
import { NextApiRequest } from "next";
import { Session } from "next-auth";

export interface RequestWithSession extends NextApiRequest {
  session: Session;
}

export interface RequestWithUser extends RequestWithSession {
  user: Prisma.UserGetPayload<{
    include: {
      groupMember: true
    }
  }>;
}
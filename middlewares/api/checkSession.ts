import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

const checkSession = () => async (req: NextApiRequest, res: NextApiResponse, next: any) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    req.session = session;
    return next();
  } else {
    return res.status(401).json({ message: 'Not authed' });
  }
}

export default checkSession;
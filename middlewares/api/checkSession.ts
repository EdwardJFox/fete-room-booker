import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

interface Request extends NextApiRequest {
  session: Session;
}

const checkSession = () => async (req: Request, res: NextApiResponse, next: any) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    req.session = session;
    return next();
  } else {
    return res.status(401).json({ message: 'Not authed' });
  }
}

export default checkSession;
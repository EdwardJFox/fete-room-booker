import { NextApiResponse } from "next";
import { RequestWithUser } from "types/requests";

const isAdmin = () => (req: RequestWithUser, res: NextApiResponse, next: any) => {
  if (req.user.admin) {
    return next();
  } else {
    return res.status(401).json({ error: 'Not admin' });
  }
}

export default isAdmin;
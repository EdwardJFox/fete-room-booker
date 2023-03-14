import { NextApiRequest, NextApiResponse } from "next";

const isAdmin = () => (req: NextApiRequest, res: NextApiResponse, next: any) => {
  if (req.user.admin) {
    return next();
  } else {
    return res.status(401).json({ error: 'Not admin' });
  }
}

export default isAdmin;
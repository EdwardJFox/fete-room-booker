import { NextApiRequest, NextApiResponse } from "next";

const isAdmin = () => (req: NextApiRequest, res: NextApiResponse, next) => {
  if (req.user.admin) {
    return next();
  } else {
    return res.status(401).end('Not admin');
  }
}

export default isAdmin;
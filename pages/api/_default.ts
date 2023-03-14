import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter<NextApiRequest, NextApiResponse>();

export const handlerOptions = {
  onError: (err: unknown, req: NextApiRequest, res: NextApiResponse) => {
    console.error(err);
    res.status(500).json({ error: "Something broke!" });
  },
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).json({ error: "Page is not found" });
  },
}
 
export default router;
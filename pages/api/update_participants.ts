import { NextApiRequest, NextApiResponse } from 'next';
import { createAccounts } from '../../services/createAccounts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(404);
  return res.end();

  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        await createAccounts();
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false });
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
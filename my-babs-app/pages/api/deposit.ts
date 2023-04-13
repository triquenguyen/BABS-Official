import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount, id } = await req.body as { amount: number, id: number }

    if (amount <= 0) {
      res.status(400).json({ message: 'Amount is required' })
      return
    }

    try {
      await prisma.user.update({
        where: { id: id },
        data: {
          balance: {
            increment: amount,
          },
        },
      })

      res.status(200).json({ message: 'Balance is updated' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
      return
    }


  } else {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }
}
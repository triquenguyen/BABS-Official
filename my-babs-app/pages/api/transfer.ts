import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount, id, receiverEmail } = await req.body as { amount: number, id: number, receiverEmail: string }

    if (amount <= 0) {
      res.status(400).json({ message: 'Amount is required' })
      return
    }
    try {

      const user = await prisma.user.findUnique({
        where: { id: id },
        select: {
          balance: true
        }
      })

      const receiver = await prisma.user.findUnique({
        where: { email: String(receiverEmail) },
        select: {
          email: true,
        }
      })

      if (!receiver) {
        res.status(400).json({ message: `Receiver does not exist ${String(receiverEmail)}` })
        return
      }

      if (user?.balance < amount) {
        res.status(400).json({ message: 'Insufficient balance' })
        return
      }

      await prisma.user.update({
        where: { id: id },
        data: {
          balance: {
            decrement: Number(amount)
          },
        },
      })

      await prisma.user.update({
        where: { email: String(receiverEmail) },
        data: {
          balance: {
            increment: Number(amount)
          },
        },
      })

      res.status(200).json({ message: `Transfer successfully` })
      return
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: `Something went wrong ${amount} and ${id} and ${receiverEmail}` })
      return
    }
  } else {
    res.status(405).end({ message: 'Method not allowed' })
    return
  }
}
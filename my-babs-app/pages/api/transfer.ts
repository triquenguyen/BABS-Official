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
          balance: true,
          email: true,
        }
      })

      const receiver = await prisma.user.findUnique({
        where: { email: String(receiverEmail) },
        select: {
          email: true,
          balance: true,
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

      const userCurrBalance = user?.balance
      const receiverCurrBalance = receiver?.balance

      await prisma.user.update({
        where: { id: id },
        data: {
          balance: {
            decrement: Number(amount)
          },
          totalTransfer: {
            increment: Number(amount)
          },
          transactions: {
            create: {
              amount: Number(amount),
              transactionType: 'Transfer',
              createdAt: new Date(),
              accountBefore: Number(userCurrBalance),
              accountAfter: Number(Number(userCurrBalance) - Number(amount)),
              receiverEmail: String(receiverEmail),
            }
          }
        }
      })

      await prisma.user.update({
        where: { email: String(receiverEmail) },
        data: {
          balance: {
            increment: Number(amount)
          },
          transactions: {
            create: {
              amount: Number(amount),
              transactionType: 'Transfer',
              createdAt: new Date(),
              accountBefore: Number(receiverCurrBalance),
              accountAfter: Number(Number(receiverCurrBalance) + Number(amount)),
              senderEmail: String(user?.email),
            },
          }
        }
      })

      res.status(200).json({ message: `Transaction succeeded!` })
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
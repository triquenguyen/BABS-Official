import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/prisma";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount, id } = await req.body as { amount: number, id: number }

    if (amount <= 0) {
      res.status(400).json({ message: 'Amount is not valid! Please enter a valid amount' })
      return
    }

    try {

      const user = await prisma.user.findUnique({
        where: { id: id },
        select: {
          balance: true,
        },
      })

      const currBalance = user?.balance

      await prisma.user.update({
        where: { id: id },
        data: {
          balance: {
            increment: Number(amount)
          },
          totalDeposit: {
            increment: Number(amount)
          },
          transactions: {
            create: {
              amount: Number(amount),
              transactionType: 'Deposit',
              createdAt: new Date(),
              accountBefore: Number(currBalance),
              accountAfter: Number(Number(currBalance) + Number(amount))
            }
          }
        },
      })
      

      res.status(200).json({ message: `Transaction succeeded!` })
      return



    } catch (error) {
      console.log(error)
      res.status(500).json({ message: `Something went wrong ${amount} and ${id}` })
      return
    }
  } else {
    res.status(405).end({ message: 'Method not allowed' })
    return
  }
}
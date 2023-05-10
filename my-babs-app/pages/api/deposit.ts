import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/prisma";
import bcrypt from 'bcrypt'



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount, id, accountId, password } = await req.body as { amount: number, id: number, accountId: number, password: string }

    if (amount <= 0) {
      res.status(400).json({ message: 'Amount is not valid! Please enter a valid amount' })
      return
    }

    if (amount > 5000) {
      res.status(400).json({ message: 'Please deposit less than $5000 each time' })
      return
    }

    try {

      const user = await prisma.user.findUnique({
        where: { id: id },
        select: {
          password: true,
          accounts: {
            where: { id: Number(accountId) },
          }
        },
      })

      const passwordMatch = await bcrypt.compare(password, user?.password)

      if (!passwordMatch) {
        res.status(400).json({ message: `Password is not valid! Please enter a valid password` })
        return
      }

      if (!user?.accounts[0]) {
        res.status(400).json({ message: `Account is not valid! Please enter a valid account` })
        return
      }

      const currBalance = await prisma.user.findUnique({
        where: { id: id },
        select: {
          accounts: {
            where: { id: Number(accountId) },
            select: {
              balance: true
            }
          }
        }
      })

      await prisma.user.update({
        where: { id: Number(id) },
        data: {
          accounts: {
            update: {
              where: { id: Number(accountId) },
              data: {
                balance: {
                  increment: Number(amount)
                }
              }
            }
          },
          totalDeposit: {
            increment: Number(amount)
          },
          transactions: {
            create: {
              amount: Number(amount),
              accountId: Number(accountId),
              transactionType: 'Deposit',
              createdAt: new Date(),
              accountBefore: Number(currBalance?.accounts[0].balance),
              accountAfter: Number(Number(currBalance?.accounts[0].balance) + Number(amount))
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
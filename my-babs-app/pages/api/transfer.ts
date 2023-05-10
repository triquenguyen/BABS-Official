import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs/prisma";
import bcrypt from 'bcrypt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { amount, id, receiverEmail, accountId, receiverAccountId, password } = await req.body as { amount: number, id: number, receiverEmail: string, accountId: number, receiverAccountId: number, password: string }

    if (amount <= 0) {
      res.status(400).json({ message: 'Amount is required' })
      return
    }

    if (amount > 5000) {
      res.status(400).json({ message: 'Please transfer less than $5000 each time' })
      return
    }

    try {

      const user = await prisma.user.findUnique({
        where: { id: id },
        select: {
          password: true,
          email: true,
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

      const receiver = await prisma.user.findUnique({
        where: { email: String(receiverEmail) },
        select: {
          email: true,
          accounts: {
            where: { id: Number(receiverAccountId) },
          }
        }
      })

      if (!receiver) {
        res.status(400).json({ message: `Receiver does not exist ${String(receiverEmail)}` })
        return
      }

      if (!receiver?.accounts[0]) {
        res.status(400).json({ message: `Receiver Account is not valid! Please enter a valid account` })
        return
      }

      const userCurrBalance = await prisma.user.findUnique({
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

      if (userCurrBalance?.accounts[0].balance < amount) {
        res.status(400).json({ message: `Your current balance is ${userCurrBalance?.accounts[0].balance}. Please transfer a valid amount` })
        return
      }

      const receiverCurrBalance = await prisma.user.findUnique({
        where: { email: String(receiverEmail) },
        select: {
          accounts: {
            where: { id: Number(receiverAccountId) },
            select: {
              balance: true
            }
          }
        }
      })

      await prisma.user.update({
        where: { id: id },
        data: {
          accounts: {
            update: {
              where: { id: Number(accountId) },
              data: {
                balance: {
                  decrement: Number(amount)
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
              transactionType: 'Transfer',
              createdAt: new Date(),
              accountBefore: Number(userCurrBalance?.accounts[0].balance),
              accountAfter: Number(Number(userCurrBalance?.accounts[0].balance) - Number(amount)),
              receiverEmail: String(receiverEmail),
            }
          }
        }
      })

      await prisma.user.update({
        where: { email: String(receiverEmail) },
        data: {
          accounts: {
            update: {
              where: { id: Number(receiverAccountId) },
              data: {
                balance: {
                  increment: Number(amount)
                }
              }
            }
          },
          transactions: {
            create: {
              amount: Number(amount),
              accountId: Number(receiverAccountId),
              transactionType: 'Transfer',
              createdAt: new Date(),
              accountBefore: Number(receiverCurrBalance?.accounts[0].balance),
              accountAfter: Number(Number(userCurrBalance?.accounts[0].balance) + Number(amount)),
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
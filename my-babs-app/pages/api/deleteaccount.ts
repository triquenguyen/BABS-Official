import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/libs/prisma'
import bcrypt from 'bcrypt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id, password, accountId } = await req.body as { id: number, password: string, accountId: number }

    try {
      const user = await prisma.user.findUnique({
        where: { id: id },
        select: {
          password: true,
          accounts: {
            where: { id: Number(accountId) },
            select: {
              balance: true
            }
          }
        }
      })


      const passwordMatch = await bcrypt.compare(password, user?.password)

      if (!passwordMatch) {
        res.status(400).json({ message: `Password is not valid! Please enter a valid password` })
        return
      }

      console.log(user?.accounts[0].balance)

      if (Number(user?.accounts[0].balance) != 0){
        res.status(400).json({ message: `Please withdraw or transfer all money before deleting this account` })
        return
      } 

      await prisma.user.update({
        where: { id: id },
        data: {
          accounts: {
            delete: {
              id: Number(accountId)
            }
          }
        }
      })

      res.status(200).json({ message: `Account ${accountId} has been deleted!` })

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: `Something went wrong ${accountId} and ${id}` })
      return
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
  }
}
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/libs/prisma'
import bcrypt from 'bcrypt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { type, id, password } = await req.body as { type: string, id: number, password: string }

    if (type != "Checking Account" && type != "Saving Account") {
      res.status(400).json({ message: 'Type is not valid! Please enter a valid type' })
      return
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: id },
        select: {
          password: true,
        }
      })

      const passwordMatch = await bcrypt.compare(password, user?.password)

      if (!passwordMatch) {
        res.status(400).json({ message: `Password is not valid! Please enter a valid password` })
        return
      }

      await prisma.user.update({
        where: { id: id },
        data: {
          accounts: {
            create: {
              type: type,
              balance: 0,
              createdAt: new Date(),
            }
          }
        }
      })

      res.status(200).json({ message: `Account creation succeeded!` })

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: `Something went wrong ${type} and ${id}` })
      return
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
  }
}
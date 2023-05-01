import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/libs/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, firstName, lastName, password, confirmPass, newPassword, id } = await req.body as { email: string, firstName: string, lastName: string, password: string, confirmPass: string, newPassword: string, id: number };

    try {

      const user = await prisma.user.findUnique({
        where: { id: id, email: email },
        select: {
          password: true,
        },
      })

      const passwordMatch = await bcrypt.compare(password, user?.password)

      if (!passwordMatch) {
        res.status(400).json({ message: `Password is not valid! Please enter a valid password` })
        return
      }

      if (newPassword) {
        if (newPassword !== confirmPass) {
          res.status(400).json({ message: `Passwords do not match! Please enter a valid password` })
          return
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
          where: { id: id, email: email },
          data: {
            password: hashedPassword,
          }
        });
      }

      if (firstName) {
        await prisma.user.update({
          where: { id: id, email: email },
          data: {
            firstName: firstName,
          }
        });
      }

      if (lastName) {
        await prisma.user.update({
          where: { id: id, email: email },
          data: {
            lastName: lastName,
          }
        });
      }

      if (email) {
        await prisma.user.update({
          where: { id: id, email: email },
          data: {
            email: email,
          }
        });
      }

      res.status(200).json({ message: 'Profile updated successfully' })
      return

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' })
      return
    }
  } else {
    res.status(405).end('Method Not Allowed')
    return
  }
}
import bcrypt from "bcrypt";
import { prisma } from '@/libs/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

interface UserReq {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPass: string;
  pincode: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'POST') {
    const { email, firstName, lastName, password, confirmPass, pincode } = await req.body as UserReq;

    if (!firstName || !lastName || !email || !password || !pincode || !confirmPass) {
      return res.status(400).json({ message: 'Please enter all fields!' })
    }

    if (password == confirmPass) {
      try {
        const userExists = await prisma.user.findUnique({
          where: { email: email },
        });

        if (userExists) {
          res.status(400).json({ message: 'This email has been used! Please log in with this email or sign up with another email' })
          return
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create(
          {
            data: {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: hashedPassword,
              pincode: pincode,
            }
          });

        res.status(201).json({ message: 'User is created' })
        return
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' })
        return
      }
    } else {
      res.status(400).json({ message: 'Passwords do not match' })
      return
    }

  } else {
    res.status(405).end('Method Not Allowed')
    return
  } 
}

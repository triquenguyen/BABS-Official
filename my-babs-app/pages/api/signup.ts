import bcrypt from "bcrypt";
import { prisma } from '@/libs/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

interface UserReq {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPass: string;
  pincode: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'POST') {
    const { username, firstName, lastName, password, confirmPass, pincode } = await req.body as UserReq;

    if (!firstName || !lastName || !username || !password || !pincode || !confirmPass) {
      return res.status(400).json({ message: 'Please enter all fields!' })
    }

    if (password == confirmPass) {
      try {
        const userExists = await prisma.user.findUnique({
          where: { username: username },
        });

        if (userExists) {
          res.status(400).json({ message: 'This username has been used! Please log in with this username or sign up with another username' })
          return
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create(
          {
            data: {
              firstName: firstName,
              lastName: lastName,
              username: username,
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

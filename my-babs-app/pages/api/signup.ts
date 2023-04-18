import bcrypt from "bcrypt";
import { prisma } from '@/libs/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

interface UserReq {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  pincode: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    const { email, firstName, lastName, password, pincode } = await req.body as UserReq;

    if (!firstName || !lastName || !email || !password || !pincode) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    try {
      const userExists = await prisma.user.findUnique({
        where: { email: email },
      });

      if (userExists) {
        res.status(400).json({ message: 'User already exists' })
        return
        // return new Response('User already exists', { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create(
        {
          data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            pincode: pincode
          }
        });

      res.status(201).json({ message: 'User is created' })
      return

      // return new Response('User is created', { status: 201 });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' })
      return
      // return new Response('Something went wrong', { status: 500 });
    }
  } else {
    res.status(405).end('Method Not Allowed')
    return
  }
}

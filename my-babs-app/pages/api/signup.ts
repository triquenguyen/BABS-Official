import bcrypt from "bcrypt";
import { prisma } from '@/libs/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";

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

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      });
    }

    if (!/^\d{4}$/.test(pincode)) {
      return res.status(400).json({ message: 'Invalid pincode. Pincode must be 4 numbers only' });
    }

    // const response = await axios.post(`https://api.zerobounce.net/v2/validate?api_key=${process.env.ZEROBOUNCE_API_KEY}&email=${email}&ip_address`)
    const response = await axios.post(`https://api.zerobounce.net/v2/validate?api_key=${process.env.ZEROBOUNCE_API_KEY}&email=${email}&ip_address=`)
  
    if (response.data.status != 'valid') {
      return res.status(400).json({ message: 'Please enter a valid email address' })
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

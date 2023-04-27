import bcrypt from "bcrypt";
import { prisma } from '@/libs/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";

interface UserReq {
    pincode: String
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { pincode } = await req.body as UserReq
        const token = await getToken({ req });
        if (token) {
            const user = await prisma.user.findUnique({ where: { id: token.id } });
            if (pincode === user?.pincode)
            {
                res.status(200).json({ message: 'Success', success: true})
                return
            }
            else
            {
                res.status(200).json({message: 'Wrong pin code'})
                return
            }
        }
        res.status(401).json({ message: "Not logged in" })
        return
    } else {
        res.status(405).end('Method Not Allowed')
        return
    }
}

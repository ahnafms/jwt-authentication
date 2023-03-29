import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res){
  if(req.method === 'POST'){
    console.log('masuk')
    try{
        const {name, email, password} = req.body
        const user = await prisma.user.create({
        data: {
            email,
            name,
            password
          }
        })
        res.status(201).json(user);
    }
    catch(error){
      console.error(error);
      res.status(500).json({message: 'Error creating user'});
    }
  }
}

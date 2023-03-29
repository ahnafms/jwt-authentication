import bcrypt from 'bcrypt'
import {prisma} from '@/database/db.js'

export default async function handler(req, res){
  if(req.method === 'POST'){
    try{
        const {name, email, password} = req.body
        const hashedPassword = bcrypt.hashSync(password, 10)
        const user = await prisma.user.create({
        data: {
            email,
            name,
            password : hashedPassword
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

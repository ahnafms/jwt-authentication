import RSA from '@/lib/crypto'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
var fs = require('fs');
const path = require('path');
import {prisma} from '@/database/db.js'

export default async function handler(req, res){
  if(req.method === 'POST'){
    try{
        const { email, password} = req.body
        const user = await prisma.user.findFirst({
          where : {
            email    
          } 
        })
        if(bcrypt.compareSync(password, user.password)){
          //create jwt
          let header = {
            "alg": "RSA",
            "typ": "JWT"
          }
          let payload = {
            name : user.name,
            iat : new Date().getSeconds()
          } 
          const filePath = path.join(process.cwd(), 'src', 'data', 'rsa.json');   
          const fileRead = fs.readFileSync(filePath)
          const key = JSON.parse(fileRead)         
          const rsa = new RSA() 
          let signatureMessage = base64urlEncode(JSON.stringify(header)) + "." + base64urlEncode(JSON.stringify(payload)) + "," + key.publicKey[0]
          const signature = rsa.encryptRSA(signatureMessage, key.publicKey)
          
          const jwt = base64urlEncode(JSON.stringify(header)) + "." + base64urlEncode(JSON.stringify(payload)) + "." + base64urlEncode(signature)
          res.status(200).json({ token : jwt})
        } 
        else res.redirect(403, "/unauth");
    }
    catch(error){
      console.error(error);
      res.status(500).json({message: 'Error creating user'});
    }
  }
}

function base64urlEncode(str) {
  let base64 = btoa(str);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}


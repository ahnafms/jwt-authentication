import path from 'path';
import RSA from "@/lib/crypto";
const fs = require('fs');

export default async function handler(req, res){
  if(req.method === 'POST'){
    try{
      const filePath = path.join(process.cwd(), 'src', 'data', 'rsa.json');   
      const fileRead = fs.readFileSync(filePath)
      const key = JSON.parse(fileRead)         
      const rsa = new RSA()        
      const jwt = req.cookies.jwt 
      if(!jwt) throw new Error('Unauthorized');  
      const header = jwt.split('.')[0]
      const payload = jwt.split('.')[1]
      const signature = jwt.split('.')[2]
      const decodeSign = base64urlDecode(signature).split(",").map(Number)  
      
      const decryptedSign = rsa.decryptRSA(decodeSign, key.privateKey)
      console.log(decryptedSign)
      
      if(decryptedSign.split(",")[1] != key.publicKey[0]) res.status(401).json({message: 'Unauthorize'})
      if(header != decryptedSign.split('.')[0]) res.status(401).json({message: 'Unauthorize'})
      if(payload != decryptedSign.split('.')[1].split(',')[0]) res.status(401).json({message: 'Unauthorize'})

      res.status(200).json({message: "success"})
    }
    catch(error){
      console.error(error);
      res.status(401).json({message: 'Unauthorize'});
    }
  }
}

function base64urlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  
  while (str.length % 4 !== 0) {
    str += '=';
  }
  
  const decoded = atob(str);
  
  return decoded;
}

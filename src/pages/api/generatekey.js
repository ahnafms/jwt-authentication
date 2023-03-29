import RSAKeyGenerator from "@/lib/crypto";
import RSA from "@/lib/crypto";
const fs = require('fs');
import path from 'path';

export default async function handler(req, res){
  if(req.method === 'GET'){
    const rsa = new RSA()   
    const key = rsa.generateRSAKeys(8)    
    console.log(key)
    const filePath = path.join(process.cwd(), 'src', 'data', 'rsa.json');   
    fs.writeFileSync(filePath, JSON.stringify({ publicKey : key.publicKey, privateKey : key.privateKey}))

    res.status(200).json({message : "sip"})
    
  }
}

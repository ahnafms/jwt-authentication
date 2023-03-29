import useAuth from "@/middleware/auth";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

export default function Dashbord() {
  useAuth()
  const [name, setName] = useState("")
  
  useEffect(() => {
    const jwt = Cookies.get("jwt") 
    const payload = jwt.split('.')[1]
    const payloadDecode = base64urlDecode(payload)
    const user = JSON.parse(payloadDecode) 
    setName(user.name)
  })
  return (
    <main className="h-screen w-full flex-col flex justify-center items-center">
      <div className="text-lg font-bold">
        Welcome Back !
      </div>       
      <div className="text-sm ">
        {name}
      </div>
    </main>
  )
}

function base64urlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  
  while (str.length % 4 !== 0) {
    str += '=';
  }
  
  const decoded = atob(str);
  
  return decoded;
}

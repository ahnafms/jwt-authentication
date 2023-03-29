import Link from "next/link";
import React from "react";

export default function Unauth() {
  return (
    <main className="h-screen w-full flex-col flex justify-center items-center">
      <div className="text-lg font-bold">
        403 Unauthorize
      </div>       
      <div className="text-sm ">
        Login dulu bang :D
      </div>
      <Link href={"/login"} className="pt-10 text-slate-300 underline">
        Back to login
      </Link>
    </main>
  )
}

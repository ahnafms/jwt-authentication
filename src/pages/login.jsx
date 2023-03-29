import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Router from "next/router";
import Cookies from "js-cookie";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    await axios.post("/api/auth/login", data, {
      headers:{
        'Access-Control-Allow-Origin' : '*'
      }
    }).then(res => {
      console.log(res)
      Cookies.set("jwt", res.data.token )
      Router.push('/dashboard')
    }).catch((err)=> console.log(err))
  };
  return (
    <main className="h-screen w-full flex-col flex justify-center items-center">
      <div className="flex flex-col justify-center items-start gap-y-5 p-9 rounded-xl border-slate-800 border-2">
        <p className="text-center w-full">Login</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5"
        >
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="px-4 py-2 rounded-sm"
          />
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="px-4 py-2 rounded-sm"
          />
          <button className="p-3" type="submit">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

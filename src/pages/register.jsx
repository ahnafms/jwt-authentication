import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const res = await axios.post("/api/auth/register", data, {
      headers:{
        'Access-Control-Allow-Origin' : '*'
      }
    }).catch((err)=> console.log(err))
    console.log(res);
  };
  return (
    <main className="h-screen w-full flex-col flex justify-center items-center">
      <div className="flex flex-col justify-center items-start gap-y-5 p-9 rounded-xl border-slate-800 border-2">
        <p className="text-center w-full">Register</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-3"
        >
          <label htmlFor="name">Name</label>
          <input
            {...register("name")}
            type="text"
            id="nama"
            className="px-4 py-2 rounded-sm"
          />
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="px-4 py-2 rounded-sm"
          />
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            type="text"
            id="email"
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

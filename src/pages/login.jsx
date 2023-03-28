import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <main className="h-screen w-full flex-col flex justify-center items-center">
      <div className="flex flex-col justify-center items-start gap-y-5 p-9 rounded-xl border-slate-800 border-2">
        <p className="text-center w-full">Login</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5"
        >
          <label htmlFor="nama">Nama</label>
          <input
            {...register("nama")}
            type="text"
            id="nama"
            className="px-4 py-2 rounded-sm"
          />
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type="text"
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

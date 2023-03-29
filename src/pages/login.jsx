import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Router from "next/router";
import Cookies from "js-cookie";
import Alert from "@/components/alert";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [alertProps, setAlertProps] = useState({
    message: "",
    isSuccess: true,
  });

  const [isShow, setIsShow] = useState(false);
  const handleAlertClick = () => {
    setIsShow(!isShow);
  };
  const onSubmit = async (data) => {
    await axios
      .post("/api/auth/login", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        Cookies.set("jwt", res.data.token);
        setAlertProps({ message: "Succesfully Logged in", isSuccess: true });
        handleAlertClick();
        Router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setAlertProps({ message: "Error has occured", isSuccess: false });
        handleAlertClick();
      });
  };

  return (
    <main className="h-screen w-full flex-col flex justify-center items-center">
      <Alert
        message={alertProps.message}
        isSuccess={alertProps.isSuccess}
        isShow={isShow}
        onClick={handleAlertClick}
      />
      <div className="flex flex-col justify-center items-start gap-y-5 p-12  rounded-xl border-glow">
        <p className="text-center w-full font-bold text-lg">LOGIN</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label className="label">
            <span className="label-text text-base">Email</span>
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="input input-bordered px-4 py-2 rounded-lg"
          />
          <label className="label pt-6">
            <span className="label-text text-base">Password</span>
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="input input-bordered px-4 py-2 rounded-lg"
          />
          <button className="mt-12 p-3 btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

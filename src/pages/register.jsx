import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Alert from "@/components/alert";

export default function Register() {
  const [alertProps, setAlertProps] = useState({
    message: "",
    isSuccess: true,
  });

  const [isShow, setIsShow] = useState(false);
  const handleAlertClick = () => {
    setIsShow(!isShow);
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    await axios
      .post("/api/auth/register", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(
        () =>
          setAlertProps({
            message: "Succesfully Registered",
            isSuccess: true,
            isShow: true,
          }),
        handleAlertClick()
      )
      .catch(
        () =>
          setAlertProps({
            message: "Error has occured",
            isSuccess: false,
          }),
        handleAlertClick()
      );
  };
  return (
    <main className="h-screen w-full flex-col flex justify-center items-center">
      <Alert
        message={alertProps.message}
        isSuccess={alertProps.isSuccess}
        isShow={isShow}
        onClick={handleAlertClick}
      />
      <div className="flex flex-col justify-center items-start gap-y-5  p-12 rounded-xl border-glow">
        <p className="font-bold text-center w-full text-lg">REGISTER</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-3"
        >
          <label className="label">
            <span className="label-text text-base">Name</span>
          </label>
          <input
            {...register("name")}
            type="text"
            id="nama"
            className="input input-bordered px-4 py-2 rounded-lg"
          />
          <label className="label">
            <span className="label-text text-base">Password</span>
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className="input input-bordered px-4 py-2 rounded-lg"
          />
          <label className="label">
            <span className="label-text text-base">Email</span>
          </label>
          <input
            {...register("email")}
            type="text"
            id="email"
            className="input input-bordered px-4 py-2 rounded-lg"
          />
          <button className="btn mt-10 p-3" type="submit">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

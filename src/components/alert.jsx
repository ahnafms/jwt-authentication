import clsx from "clsx";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
const Alert = ({ message, isSuccess, isShow = false, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        [isShow ? "-translate-y-0" : "translate-y-32"],
        [
          "z-50 w-fit bottom-12 right-12 fixed  shadow-lg flex transform transition-all duration-500 cursor-pointer",
        ]
      )}
    >
      {isSuccess ? (
        <div className="alert alert-success shadow-lg">
          <CheckCircleIcon className="w-8 text-black"/>
          <span>{message}</span>
        </div>
      ) : (
        <div className="alert alert-error shadow-lg">
          <XCircleIcon className="w-8 text-black"/>
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default Alert;

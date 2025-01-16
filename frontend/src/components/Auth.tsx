import { SignupInput } from "@webbedpiyush/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";

export default function Auth({ type }: { type: "signup" | "signin" }) {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    password: "",
    email: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        { postInputs }
      );
      const jwt = response.data;
      console.log(jwt);
      localStorage.setItem("token", jwt.jwt);
      navigate("/posts");
    } catch (error: any) {
      alert("error while signing up");
      console.error(error);
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col ">
      <div className="flex justify-center ">
        <div className="w-[350px] lg:w-[450px]">
          <div className="text-3xl font-extrabold text-center">
            Create an Account
          </div>
          <div className="text-slate-400 text-center">
            {type === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              to={type === "signin" ? "/signup" : "/signin"}
              className="pl-2 underline"
            >
              {type === "signin" ? "sign Up" : "Sign In"}
            </Link>
          </div>
          <div className="flex flex-col gap-2 mt-5">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Piyush Tiwari..."
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: any) => {
                  setPostInputs((c) => ({
                    ...c,
                    name: e.target.value,
                  }));
                }}
              />
            ) : (
              ""
            )}
            <LabelledInput
              label="Username"
              placeholder="piyush@gmail.com"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e: any) => {
                setPostInputs((c) => ({
                  ...c,
                  email: e.target.value,
                }));
              }}
            />
            <LabelledInput
              label="Password"
              type={"password"}
              placeholder="Piyush Tiwari..."
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e: any) => {
                setPostInputs((c) => ({
                  ...c,
                  password: e.target.value,
                }));
              }}
            />
            <button
              type="button"
              onClick={sendRequest}
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signin" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-semibold text-gray-900 mt-4"
      >
        {label}
      </label>
      <input
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
}

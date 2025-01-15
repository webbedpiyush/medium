import { SignupInput } from "@webbedpiyush/medium-common";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

export default function Auth({ type }: { type: "signup" | "signin" }) {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    password: "",
    username: "",
  });

  return (
    <div className="h-screen flex justify-center flex-col">
      {JSON.stringify(postInputs)}
      <div className="flex justify-center">
        <div>
          <div className="text-3xl font-extrabold text-center">
            Create an Account
          </div>
          <div className="text-slate-400">
            Already have an account ?
            <Link to={"/signin"} className="pl-2 underline">
              Login
            </Link>
          </div>
        </div>
        <LabelledInput
          label="Name"
          placeholder="Piyush Tiwari..."
          onChange={(e: unknown) => {
            setPostInputs((c) => ({
              ...c,
              name: e.target.value,
            }));
          }}
        />
      </div>
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, onChange }: LabelledInputType) {
  return (
    <div>
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type="text"
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </div>
  );
}

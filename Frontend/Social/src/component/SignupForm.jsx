import React, { useState } from "react";
import {
  ProfileContextProvider,
  useProfileContext,
} from "../Reducer/profileReducer";

function SignupForm() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conPassword: "",
  });

  const { createUser } = useProfileContext();

  const handleForm = (e) => {
    e.preventDefault();
    createUser(data);
  };

  return (
    <>
      <div className="w-[100%] flex flex-col -z-0 justify-start  relative -top-3">
        <img src="/logo.png" alt="Logo" className="h-[8vh] mx-auto mb-5" />
        <p className="text-center mb-4 text-3xl w-[80%] mx-auto">
          Get Started with Professionals
        </p>
      </div>
      <div>
        <form onSubmit={handleForm}>
          <div className="w-[80%] mx-auto h-auto flex justify-evenly  gap-0.5 my-2 formInput">
            <input
              required
              type="text"
              placeholder="First name"
              value={data.firstName}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
              className="border w-[49%] border-gray-700 border-opacity-35 rounded-sm px-2 py-2"
            />
            <input
              required
              type="text"
              placeholder="Last Name"
              value={data.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
              className="border w-[49%] border-gray-700 border-opacity-35 rounded-sm px-2 py-2"
            />
          </div>

          <div className="w-[80%] mx-auto h-auto flex flex-col gap-0.5 my-2 formInput">
            <input
              required
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Enter your Mail"
              className="border border-gray-700 border-opacity-35 rounded-sm px-2 py-2"
            />
          </div>

          <div className="w-[80%] mx-auto h-auto flex flex-col gap-0.5 my-2 formInput">
            <input
              required
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="Enter Password"
              className="border border-gray-700 border-opacity-35 rounded-sm px-2 py-2"
            />
          </div>
          <div className="w-[80%] mx-auto h-auto flex flex-col gap-0.5 my-2 formInput">
            <input
              required
              type="password"
              value={data.conPassword}
              onChange={(e) =>
                setData({ ...data, conPassword: e.target.value })
              }
              placeholder="Confirm Password"
              className="border border-gray-700 border-opacity-35 rounded-sm px-2 py-2"
            />
          </div>
          <div className="w-[80%] mx-auto h-auto flex flex-col gap-0.5 my-1.5 formInput">
            <input
              type="submit"
              value="Login"
              className="border bg-blue-600 bg-opacity-100 font-bold text-white my-4 border-gray-700 border-opacity-35 rounded-sm px-2 py-2 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupForm;

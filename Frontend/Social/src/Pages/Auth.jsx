import React, { useEffect, useState } from "react";
import AuthBlock1 from "../component/AuthBlock1";
import { useProfileContext } from "../Reducer/profileReducer";
import Loading from "../component/Loading";
import Modal from "../component/Modal";
import SignupForm from "../component/SignupForm";

function Auth() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { profileLogin, loading, error } = useProfileContext();
  const [showSignUp, setShowSignUp] = useState(false);

  const [isError, setIsError] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    profileLogin(data);
  };
  useEffect(() => {
    if (error) {
      setIsError(true);
    }
  },[handleForm]);

  return (
    <>
      <div className="w-screen h-screen flex flex-col md:flex-row gap-10 md:gap-0 justify-center items-center">
        <AuthBlock1>
          <div className="flex flex-col items-center md:justify-center">
            <div className="w-full h-[11vh] none md:block">
              <img src="/logo.png" alt="Logo" className="" />
            </div>
            <div className="text-left my-2">
              <p className="w-full h-auto text-4xl font-tin text-center md:text-left font-mono">
                Get Connect with Professionals.
              </p>
            </div>
          </div>
        </AuthBlock1>

        <AuthBlock1>
          <div className="w-[30vw] mx-auto authContainer h-auto border border-gray-800 border-opacity-35">
            <div>
              <img
                src="/logo.png"
                alt="Logo"
                className="h-[8vh] mx-auto my-5"
              />
            </div>

            <div>
              <form onSubmit={handleForm}>
                <div className="w-[80%] mx-auto h-auto flex flex-col gap-0.5 my-2 formInput">
                  <input
                    required
                    type="email"
                    placeholder="Enter Your Email"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    className="border border-gray-700 border-opacity-35 rounded-sm px-2 py-2"
                  />
                </div>
                <div className="w-[80%] mx-auto h-auto flex flex-col gap-0.5 my-2 formInput">
                  <input
                    required
                    type="password"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    placeholder="Enter Password"
                    className="border border-gray-700 border-opacity-35 rounded-sm px-2 py-2"
                  />
                </div>
                {/* ERROR */}
                <div className="w-[80%] h-auto mx-auto mt-4">
                  <p className="text-sm text-red-500">
                    *{error ? error?.message : ""}
                  </p>
                </div>
                <div className="w-[80%] mx-auto h-auto flex flex-col gap-0.5 mb-1.5 formInput">
                  <input
                    type="submit"
                    value="Login"
                    className="border bg-blue-600 bg-opacity-100 font-bold text-white -4 border-gray-700 border-opacity-35 rounded-sm px-2 py-2 cursor-pointer"
                  />
                </div>
              </form>
              <div className="flex w-[80%] mx-auto items-center justify-center formInput">
                <div className="w-[50%] border border-gray-700"></div>
                <div className="w-[10%] text-center font-base text-xl">or</div>
                <div className="w-[50%] border border-gray-700"></div>
              </div>
              <div className="w-[80%] text-center mx-auto mt-4 mb-6 formInput">
                <p className="mx-auto w-[100%]">
                  Don't have an account?
                  <button
                    className="text-blue-700 text-medium"
                    onClick={() => setShowSignUp(true)}
                  >
                    sign up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </AuthBlock1>
        {showSignUp && (
          <Modal
            onClose={() => setShowSignUp(false)}
            element={<SignupForm />}
          />
        )}
        {loading && <Loading />}
      </div>
    </>
  );
}

export default Auth;

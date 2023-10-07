import React from "react";

const SignIn = () => {
  return (
    <>
      <section className="w-full h-screen bg-[url('https://149695847.v2.pressablecdn.com/wp-content/uploads/2019/05/india-1540x1023.jpg')] bg-cover bg-center">
        <div className="min-h-screen flex flex-col justify-center sm:py-12 backdrop-brightness-50">
          <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
              <h1 className="font-bold text-center text-2xl py-5">Login</h1>
              <div className="px-5 py-7">
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  E-mail
                </label>
                <input
                  type="email"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  ref={EmailRef}
                  required
                />
                <label className="font-semibold text-sm text-gray-600 pb-1 block">
                  Password
                </label>
                <input
                  type="password"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  ref={PasswordRef}
                  required
                />
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">Login</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
              {error && (
                <h1 className="max-w-full m-4 py-4 px-2 text-xs text-red-800 bg-red-300 rounded">
                  {error}
                </h1>
              )}
              <div className="py-5">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-center sm:text-left whitespace-nowrap">
                    <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4 inline-block align-text-top"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="inline-block ml-1">Forgot Password</span>
                    </button>
                  </div>
                  <div className="text-center sm:text-right  whitespace-nowrap"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;

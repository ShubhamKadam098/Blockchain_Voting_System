import React, { useEffect, useState } from "react";
import FingerprintIcon from "../../assets/Fingerprint.png";
import Metamask from "../../assets/metamaskIcon.svg";
import LoginHeader from "../Header/LoginHeader";
import Footer from "../Footer/Footer";
import useUser from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { currentUser, error, connectMetamask, fetchVoterDetails } = useUser();
  const [Fingerprint, setFingerprint] = useState(null);
  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.walletId != "N/A") fetchVoterDetails();
  }, [currentUser.walletId]);

  // Handle Submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <LoginHeader />
      <section className="w-full min-h-screen bg-[url('https://static.toiimg.com/thumb/imgsize-143020,msid-100114467,width-1400,resizemode-4/100114467.jpg')] bg-cover bg-center ">
        <div className="min-h-screen flex flex-col justify-center backdrop-brightness-50 py-6">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0 w-[60%]">
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0  ">
              <div className="p-6  space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-center font-bold text-2xl  leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Login
                </h1>
                {error && (
                  <>
                    <div
                      className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-300 "
                      role="alert"
                    >
                      <svg
                        className="flex-shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium">
                          Something went wrong!
                        </span>{" "}
                        {error}.
                      </div>
                    </div>
                  </>
                )}
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Connect Your Wallet
                    </label>
                    <div className="flex items-center justify-start h-16 border border-gray-300">
                      <img
                        name="title"
                        src={Metamask}
                        className="h-full bg-gray-50  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 "
                      />
                      <h4 className="font-semibold">Metamask</h4>
                    </div>
                  </div>

                  {currentUser.walletId != "N/A" ? (
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="w-full text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Connected
                    </button>
                  ) : (
                    <button
                      type="submit"
                      onClick={async (e) => {
                        e.preventDefault();
                        await connectMetamask();
                      }}
                      className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Connect
                    </button>
                  )}
                </form>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="aadhar"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your Aadhar Number
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={currentUser.aadharNumber}
                      className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 tracking-[1rem] "
                      placeholder=""
                      required
                      disabled
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Fingerprint"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Biometrics
                    </label>
                    <div className=" flex items-center justify-start h-20 bg-gray-50 border border-gray-300 rounded-lg gap-2">
                      <img
                        src={FingerprintIcon}
                        className="h-[80%] rounded-full p-2"
                        alt=""
                      />
                      <div className="">
                        <input
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none "
                          aria-describedby="file_input_help"
                          id="Fingerprint"
                          type="file"
                          disabled={
                            currentUser.aadharNumber == "N/A" ? true : false
                          }
                          onChange={(e) => {
                            setFingerprint(e.target.files[0]);
                            console.log(Fingerprint);
                          }}
                          required
                        />
                        <p
                          className="mt-1 text-xs text-gray-500 "
                          id="file_input_help"
                        >
                          BMP (MAX. 800x400px).
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    disabled={
                      Loading || currentUser.aadharNumber == "N/A"
                        ? true
                        : false
                    }
                  >
                    Authenticate
                  </button>
                  <p className="text-sm font-light text-gray-500">
                    Aadhar Number not visible?
                    <button
                      onClick={() => {
                        location.reload();
                      }}
                    >
                      Try Again
                    </button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;

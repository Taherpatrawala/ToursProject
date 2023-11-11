import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../../Slices/tokensSlice";
import { useState } from "react";
const Login = () => {
  const [logInData, setlogInData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleLogin = async () => {
    axios
      .post("http://127.0.0.1:8000/api/token/", logInData)
      .then((res) => {
        dispatch(setToken(res.data));
        localStorage.setItem("access_token", res.data.access);
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div>
      <div className="bg-gray-50 dark:bg-gray-900 overflow-visible">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            Log in to Voyager
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Log in to your account
              </h1>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={logInData.email}
                  onChange={(e) => {
                    setlogInData({ ...logInData, email: e.target.value });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={logInData.password}
                  onChange={(e) => {
                    setlogInData({
                      ...logInData,
                      password: e.target.value,
                    });
                  }}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <button
                onClick={handleLogin}
                className="w-full text-white bg-primary-600  border-green-300 rounded-md hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Log in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                New to Voyager?
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign Up here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImg from "../../assets/Login/login.png";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import SocialLogin from "../shared/SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, setLoading, signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    // Simulating an asynchronous login request
    setTimeout(() => {
      signIn(data.email, data.password)
        .then((result) => {
          const user = result?.user;
          reset();
          toast.success(
            `${user?.displayName || "Unknown user"} logged in successfully!`
          );
          navigate(from, { replace: true });
        })
        .catch((error) => {
          toast.error(`${error.message}`);
        });
      setLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-md overflow-hidden max-w-sm w-full border border-[#00b0e4]">
        <div className="relative mb-4">
          <img
            className="h-52 w-full object-cover py-2"
            src={loginImg}
            alt="Login"
          />
        </div>
        <div className="divider"></div>
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`appearance-none bg-transparent border-b-2 border-white w-full py-2 px-3 text-black leading-tight focus:outline-none ${
                  errors.email ? "border-red-500" : ""
                } hover:border-blue-500`}
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className={`appearance-none bg-transparent border-b-2 border-white w-full py-2 px-3 text-black leading-tight focus:outline-none ${
                    errors.password ? "border-red-500" : ""
                  } hover:border-blue-500`}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`bg-[#00b0e4] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Login"
                )}
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-[#00b0e4] hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <p className="text-center my-2">
            New to Harmony Academy?{" "}
            <Link className="underline text-[#00b0e4]" to="/sign-up">
              Sign Up
            </Link>
          </p>
          <div className="divider">OR</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;

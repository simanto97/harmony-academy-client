import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
// TODO: 1.update user profile with image
// 2. hot toast alert
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-md overflow-hidden max-w-sm w-full border border-[#00b0e4]">
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className={`appearance-none bg-transparent border-b-2 border-white w-full py-2 px-3 text-black leading-tight focus:outline-none ${
                  errors.name ? "border-red-500" : ""
                } hover:border-blue-500`}
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">
                  {errors.name.message}
                </p>
              )}
            </div>

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
            <div className="mb-4">
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
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className={`appearance-none bg-transparent border-b-2 border-white w-full py-2 px-3 text-black leading-tight focus:outline-none ${
                  errors.confirmPassword ? "border-red-500" : ""
                } hover:border-blue-500`}
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-xs italic">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="photo"
              >
                Upload Photo
              </label>
              <input
                className="appearance-none bg-transparent border-b-2 border-white w-full py-2 px-3 text-black leading-tight focus:outline-none hover:border-blue-500"
                id="photo"
                type="file"
                placeholder="Upload your photo"
                {...register("photo")}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import SocialLogin from "../../shared/SocialLogin/SocialLogin";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, setLoading, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const password = watch("password");

  const onSubmit = (data) => {
    // photo upload
    const image = data.photo[0];
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_KEY
    }`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const imageUrl = imageData?.data?.display_url;
        createUser(data.email, data.password)
          .then(() => {
            updateUserProfile(data?.name, imageUrl)
              .then((result) => {
                const user = result?.user;
                reset();
                toast.success(
                  `${
                    user?.displayName || "Unknown user"
                  } logged in successfully!`
                );
              })
              .catch((error) => {
                setLoading(false);
                toast.error(error.message);
              });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  const validatePassword = (value) => {
    if (value.length < 6) {
      return "Password should be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(value)) {
      return "Password should contain at least one capital letter.";
    }
    if (!/[^A-Za-z0-9]/.test(value)) {
      return "Password should contain at least one special character.";
    }
    return true;
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
                    validate: validatePassword,
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
                className="bg-[#00b0e4] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="text-center my-2">
            Already have an account?{" "}
            <Link className="underline text-[#00b0e4]" to="/login">
              Login
            </Link>
          </p>
          <div className="divider">OR</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-hot-toast";
const SocialLogin = () => {
  const { googleSignIn, setLoading } = useContext(AuthContext);

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        setLoading(false);
        // console.log(result.user);
        toast.success("User logged in successful");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(`${error.message}`);
        setLoading(false);
      });
  };
  return (
    <div
      onClick={handleGoogleSignIn}
      className="flex justify-center items-center btn btn-ghost"
    >
      <FcGoogle className="text-4xl" />
      <span className="ml-1">Google Login</span>
    </div>
  );
};

export default SocialLogin;

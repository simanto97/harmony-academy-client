import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const {
    isLoading,
    refetch,
    data: cart = [],
  } = useQuery({
    queryKey: ["cart", user?.email],
    enabled:
      !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await axiosSecure(`/dashboard/carts?email=${user?.email}`);
      return res.data;
    },
  });
  return [cart, refetch, isLoading];
};

export default useCart;

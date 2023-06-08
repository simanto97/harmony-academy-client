import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const { user } = useContext(AuthContext);

  const {
    isLoading,
    refetch,
    data: cart = [],
  } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_HOSTING_URL}/dashboard/carts?email=${
          user?.email
        }`
      );
      return response.json();
    },
  });
  return [cart, refetch, isLoading];
};

export default useCart;

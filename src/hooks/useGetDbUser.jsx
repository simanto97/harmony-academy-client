import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useGetDbUser = () => {
  const { user } = useContext(AuthContext);

  const { data: dbUser = [], isLoading: isDbLoading } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_HOSTING_URL}/users?email=${user?.email}`
      );
      return res.json();
    },
  });
  return [dbUser, isDbLoading];
};

export default useGetDbUser;

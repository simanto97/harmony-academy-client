import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useGetDbUser = () => {
  const [dbUser, setDbUser] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_HOSTING_URL}/users?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setDbUser(data));
  }, [user?.email]);
  return dbUser;
};

export default useGetDbUser;

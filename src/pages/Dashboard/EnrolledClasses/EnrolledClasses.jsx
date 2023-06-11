import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import SectionTitle from "../../../components/SectionTitle";

const EnrolledClasses = () => {
  const { user } = useContext(AuthContext);
  const { data: enrolledClasses = [] } = useQuery({
    queryKey: ["enrolled-classes", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_HOSTING_URL}/enrolled-classes/${user?.email}`
      );
      return res.json();
    },
  });
  return (
    <div className="md:w-4/5 mx-auto">
      <SectionTitle heading={"Enrolled Classes"} />
      <div className="grid grid-cols-1 md:grid-cols-3">
        {enrolledClasses.map((item) => (
          <div
            key={item._id}
            className="w-64 bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <img
                src={item?.item?.image}
                alt="Image"
                className="w-full h-auto transform transition-transform hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{item?.item?.name}</h2>
              <p className="text-gray-600 mb-2">$ {item?.item?.price} </p>
              <p className="text-gray-500 text-sm">
                Instructor: {item?.item?.instructorName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledClasses;

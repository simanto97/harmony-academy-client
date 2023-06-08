import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { FaRegEdit } from "react-icons/fa";

const MyClasses = () => {
  const { user } = useContext(AuthContext);
  const { data: classes = [], refetch } = useQuery({
    queryKey: ["classes", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_HOSTING_URL}/classes?email=${user?.email}`
      );
      return res.json();
    },
  });

//   const handleUpdate = (singleClass) => {
//     console.log(singleClass._id);

//   };
  return (
    <div className="md:w-4/5 mx-auto">
      <h2>My classes: {classes.length}</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Enrolled Students</th>
                <th>Available Seats</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((singleClass, index) => (
                <tr key={singleClass._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={singleClass?.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div className="font-bold">{singleClass?.name}</div>
                    </div>
                  </td>
                  <td className="text-right font-semibold">
                    $ {singleClass?.price}
                  </td>
                  <td className="text-center font-medium">
                    {singleClass?.enrolledStudents || 0}
                  </td>
                  <td className="font-medium">{singleClass?.availableSeats}</td>
                  <td className="font-medium">{singleClass?.status}</td>
                  <td>
                    <FaRegEdit
                      onClick={() => handleUpdate(singleClass)}
                      className="text-3xl text-yellow-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyClasses;

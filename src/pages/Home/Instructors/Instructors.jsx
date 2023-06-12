import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_HOSTING_URL}/users?role=instructor`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setInstructors(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="md:w-3/5 mx-auto">
      <SectionTitle heading={"Instructors"} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {instructors.map((instructor) => (
          <div
            key={instructor._id}
            className="mx-auto bg-white shadow-md rounded-md overflow-hidden hover:bg-gray-100 transition duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                className="w-full h-60 object-cover object-center transition duration-300 ease-in-out transform  hover:scale-105"
                src={instructor?.image}
                alt="Card Image"
              />
              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition duration-300 ease-in-out"></div>
            </div>
            <div className="p-4 text-center">
              <p className="text-gray-700">
                <strong>Name:</strong>{" "}
                <span className="text-[#00b0e4] text-lg font-extrabold">
                  {instructor?.name}
                </span>
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong>{" "}
                <span className="text-gray-600 text-lg ">
                  {instructor?.email}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;

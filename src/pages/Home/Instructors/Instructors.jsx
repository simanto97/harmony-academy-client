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
      <div>
        {instructors.map((instructor, index) => (
          <div
            key={index}
            className="card my-4 md:w-3/5 mx-auto lg:card-side shadow-xl transition duration-300 hover:scale-105"
          >
            <figure>
              <img
                src={instructor.image}
                alt="Album"
                className="transition duration-300 hover:scale-105"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-3xl font-bold">
                {instructor.name}
              </h2>
              <p>{instructor.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;

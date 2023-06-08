import { useEffect, useState } from "react";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    fetch("instructors.json")
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
      <h2>hello: {instructors.length}</h2>
      <div>
        {instructors.map((instructor, index) => (
          <div
            key={index}
            className="card my-4 lg:card-side shadow-xl transition duration-300 hover:scale-110"
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
              <div className="card-actions">
                <button className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                  view profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;

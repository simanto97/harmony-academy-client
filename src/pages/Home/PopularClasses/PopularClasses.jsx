import { useQuery } from "@tanstack/react-query";
import { Fade } from "react-awesome-reveal";
import SectionTitle from "../../../components/SectionTitle";

// TODO: popular classes need to implement
const PopularClasses = () => {
  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_HOSTING_URL}/popular-classes`
      );
      return res.json();
    },
  });
  return (
    <div className="w-11/12 mx-auto my-8">
      <SectionTitle heading={"Popular Classes"} />
      <div className="grid grid-cols-1 md:grid-cols-3">
        {classes.map((item) => (
          <div key={item._id} className="card w-96 bg-base-100 my-4 shadow-xl">
            <figure>
              <img src={item.image} alt="class" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {item?.name}
                <div className="badge badge-secondary">Popular</div>
              </h2>
              <Fade delay={100} cascade damping={1e-1}>
                <p className="text-gray-700">
                  <strong>Price:</strong>{" "}
                  <span className="text-green-600 font-semibold">
                    ${item?.price}
                  </span>
                </p>
              </Fade>
              <Fade delay={100} cascade damping={1e-1}>
                <p className="text-gray-700">
                  <strong>Enrolled students:</strong>{" "}
                  <span className="text-[#00b0e4] text-lg font-extrabold">
                    {item?.enrolledStudents}
                  </span>
                </p>
              </Fade>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import useGetDbUser from "../../../hooks/useGetDbUser";
import SectionTitle from "../../../components/SectionTitle";

// TODO: implement card styles
const Classes = () => {
  const { user } = useContext(AuthContext);
  const [dbUser] = useGetDbUser();
  const [classes, setClasses] = useState([]);
  const [, refetch] = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_HOSTING_URL}/classes?approve=approved`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setClasses(data);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleAddToCart = (item) => {
    const { _id, image, instructorName, name, price, availableSeats } = item;
    if (user) {
      const selectedItem = {
        classId: _id,
        name,
        image,
        availableSeats,
        instructorName,
        price,
        email: user?.email,
      };
      fetch(`${import.meta.env.VITE_HOSTING_URL}/dashboard/carts`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(selectedItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            toast.success("item added to cart");
          }
        });
    } else {
      toast.error("You need to Login first");
      navigate("/login");
    }
  };
  return (
    <div className="w-3/5 mx-auto">
      <SectionTitle heading={"Classes"} />
      <div>
        {classes.map((item) => (
          <div
            key={item._id}
            className={`card my-4  shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row  transition duration-300 hover:scale-105 ${
              item.availableSeats < 1 ? "bg-red-500" : ""
            }`}
          >
            <div className="relative md:w-1/2">
              <img
                src={item.image}
                alt="Class"
                className="w-full h-48 object-cover hover:opacity-75 transition duration-300"
              />
            </div>
            <div className="p-4 md:w-1/2">
              <h2 className="text-xl font-bold mb-2">{item.name}</h2>
              <p className="text-gray-700 mb-2">
                Instructor: {item.instructorName}
              </p>
              <p className="text-gray-700 mb-2">
                Available Seats: {item.availableSeats}
              </p>
              <p className="text-gray-700 mb-2">
                Enrolled Students: {item?.enrolledStudents || 0}
              </p>
              <p className="text-green-500 text-lg font-bold mb-4">
                ${item.price}
              </p>
            </div>
            <div className="absolute top-2 right-2">
              <button
                onClick={() => handleAddToCart(item)}
                className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ${
                  item.availableSeats < 1 || dbUser[0]?.role !== "student"
                    ? "btn-disabled bg-gray-500 hover:bg-gray-500"
                    : ""
                }`}
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;

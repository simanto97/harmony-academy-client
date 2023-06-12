import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import SectionTitle from "../../../components/SectionTitle";
import moment from "moment/moment";
import { Fade } from "react-awesome-reveal";

// import axios from "axios";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_HOSTING_URL}/payment/${user?.email}`
      );
      return res.data;
    },
  });
  return (
    <div className="md:w-4/5 mx-auto">
      <SectionTitle heading={"Payment History"} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {payments.map((item) => (
          <div
            key={item._id}
            className="bg-gray-100 shadow-lg rounded-lg p-6 hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
          >
            <div className="flex items-center mb-6">
              <img
                src={item?.item?.image}
                alt="Payment"
                className="w-12 h-12 rounded-full mr-4"
              />
              <h2 className="text-2xl font-bold">Payment Information</h2>
            </div>
            <Fade delay={1e2} cascade damping={1e-1}>
              <div>
                <p className="text-gray-700">
                  <strong>Name:</strong> {item?.name}
                </p>
                <p className="text-gray-700">
                  <strong>Transaction ID:</strong> {item?.transactionId}
                </p>
                <p className="text-gray-700">
                  <strong>Date:</strong>{" "}
                  {moment(item?.date).format("MMMM Do YYYY, h:mm a")}
                </p>
                <p className="text-gray-700">
                  <strong>Course Name:</strong>{" "}
                  <span className="text-[#00b0e4] text-lg font-extrabold">
                    {item?.item?.name}
                  </span>
                </p>
                <p className="text-gray-700">
                  <strong>Price:</strong>{" "}
                  <span className="text-green-600 font-semibold">
                    ${item?.item?.price}
                  </span>
                </p>
              </div>
            </Fade>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;

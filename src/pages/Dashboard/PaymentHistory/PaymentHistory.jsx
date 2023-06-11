import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import SectionTitle from "../../../components/SectionTitle";

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
            <div>
              <p className="text-gray-700">
                <strong>Name:</strong> {item?.name}
              </p>
              <p className="text-gray-700">
                <strong>Transaction ID:</strong> {item?.transactionId}
              </p>
              <p className="text-gray-700">
                <strong>Date:</strong> {item?.date}
              </p>
              <p className="text-gray-700">
                <strong>Instrument Name:</strong> {item?.item?.name}
              </p>
              <p className="text-gray-700">
                <strong>Price:</strong> {item?.item?.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;

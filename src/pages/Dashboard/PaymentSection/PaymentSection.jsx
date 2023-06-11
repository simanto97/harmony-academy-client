import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "../PaymentModal/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle";

const stripePromise = loadStripe(`${import.meta.env.VITE_Payment_Gateway_PK}`);

const PaymentSection = () => {
  const [item, setItem] = useState([]);
  const { id } = useParams();
  const cartId = localStorage.getItem("cart-id");

  console.log("classId: ", id);

  // console.log(item[0]?.price);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_HOSTING_URL}/dashboard/payment-section/${id}`
      );
      const data = await res.json();
      console.log(data);
      setItem(data);
    };
    fetchData();
  }, [id]);
  return (
    <div className="w-full mx-auto">
      <SectionTitle heading={"Please Pay"} className="mb-4" />
      <div className="bg-[#00b0e4] p-8 shadow-xl rounded-md w-full mx-auto md:w-4/5 lg:w-1/3">
        <Elements stripe={stripePromise}>
          <CheckoutForm item={item} cartId={cartId} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentSection;

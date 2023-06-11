import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "../PaymentModal/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

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
    <div className="md:w-4/5 mx-auto">
      <div className=" bg-black"></div>
      <div className="bg-white p-8w-4/5 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl mb-4">Please Pay </h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm item={item} cartId={cartId} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentSection;

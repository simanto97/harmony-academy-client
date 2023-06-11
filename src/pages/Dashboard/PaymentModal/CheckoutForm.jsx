import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { toast } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ item, cartId }) => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [, refetch] = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");

  const price = item[0]?.price;

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error.message);
      toast.error(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    //   confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "unknown",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError.message);
      toast.error(confirmError.message);
    } else {
      //   console.log("[PaymentIntent]", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // save payment info to server
        const paymentInfo = {
          cartId,
          transactionId: paymentIntent.id,
          name: user?.displayName,
          email: user?.email,
          date: new Date(),
          item: item[0],
          //   items: cart.map((item) => item.classId),
        };
        fetch(`${import.meta.env.VITE_HOSTING_URL}/payment`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(paymentInfo),
        })
          .then((res) => res.json())
          .then(() => {})
          .catch((error) => console.log(error.message));

        axiosSecure.post("/payment", paymentInfo).then((res) => {
          console.log(res.data);
          if (res.data.insertResult.insertedId) {
            refetch();
            const text = `Payment Successful!, TransactionId: ${paymentIntent.id}`;
            toast.success(text);
            localStorage.removeItem("cart-id");
            navigate("/dashboard/carts");
          }
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex justify-end">
        <div className="relative z-20">
          <button className="px-4 py-2 bg-red-500 text-white rounded mr-2">
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Pay ${price}
          </button>
        </div>
      </div>
    </form>
  );
};
export default CheckoutForm;

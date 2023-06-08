import { Link } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import { RiDeleteBack2Fill } from "react-icons/ri";
import Swal from "sweetalert2";

const Cart = () => {
  const [cart, refetch] = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `${import.meta.env.VITE_HOSTING_URL}/dashboard/carts/${item._id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire(
                "Deleted!",
                "Your cart item has been deleted.",
                "success"
              );
            }
          });
      }
    });
  };
  return (
    <div className="md:w-4/5 mx-auto overflow-x-auto">
      <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
        <h3 className="text-xl">Total Items: {cart.length}</h3>
        <h3 className="text-xl">Total Price: ${total}</h3>
        <Link>
          <button className="btn btn-warning btn-sm">PAY</button>
        </Link>
      </div>
      <div>
        {cart && Array.isArray(cart) ? (
          <div className="overflow-x-auto text-3xl">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Instructors Name</th>
                  <th>Price</th>
                  <th>Available Seats</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {cart.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div className="font-bold">{item.name}</div>
                      </div>
                    </td>
                    <td>{item?.instructorName}</td>
                    <td className="text-right font-semibold">
                      $ {item?.price}
                    </td>
                    <td className="text-center">{item?.availableSeats}</td>
                    <td className="text-3xl text-red-600">
                      <RiDeleteBack2Fill onClick={() => handleDelete(item)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h2 className="text-3xl text-center">No data found</h2>
        )}
      </div>
    </div>
  );
};

export default Cart;

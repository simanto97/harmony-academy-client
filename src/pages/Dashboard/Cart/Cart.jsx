import useCart from "../../../hooks/useCart";
import { RiDeleteBack2Fill } from "react-icons/ri";

const Cart = () => {
  const [cart, refetch] = useCart();
  const handleDelete = (item) => {
    fetch(`${import.meta.env.VITE_HOSTING_URL}/dashboard/carts/${item._id}`).then(res=>res.json()).then(dat);
  };
  return (
    <div className="w-4/5 mx-auto overflow-x-auto">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-3xl text-center my-8">Cart</h2>
        <button className="btn btn-warning">pay</button>
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

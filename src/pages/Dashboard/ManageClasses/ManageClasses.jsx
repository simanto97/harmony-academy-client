import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { FcApproval, FcCancel } from "react-icons/fc";
import FeedbackModal from "../FeedbackModal/FeedbackModal";
import { useState } from "react";


const ManageClasses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [classId, setClassId] = useState("");

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await fetch(`${import.meta.env.VITE_HOSTING_URL}/classes`);
    return res.json();
  });

  const handleApprove = (id) => {
    fetch(`${import.meta.env.VITE_HOSTING_URL}/classes/status/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success("Approved successfully");
        }
      })
      .catch((error) => toast.error(error.message));
  };
  const handleDeny = (id) => {
    setClassId(id);
    toggleModal();
  };
  const handleFeedbackUpdate = (feedback) => {
    console.log(feedback);
    fetch(`${import.meta.env.VITE_HOSTING_URL}/classes/status/${classId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "denied", feedback: feedback }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success("Denied successfully");
        }
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <div className="md:w-4/5 mx-auto">
      <h2>classes: {classes.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Instructor</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {classes.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-200">
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item?.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  Instructor:{" "}
                  <span className="font-semibold">{item?.instructorName}</span>
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Email: {item?.email}
                  </span>
                </td>
                <td className="text-center">{item?.availableSeats}</td>
                <td className="text-center">{item?.price}</td>
                <td className="text-center">
                  {item?.status === "approved" && "Approved"}
                  {item?.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(item._id)}
                        className="btn btn-ghost btn-xs"
                      >
                        <span>Approve</span>
                        <FcApproval className="text-2xl" />
                      </button>
                      <button
                        onClick={() => handleDeny(item._id)}
                        className="btn btn-ghost btn-xs"
                      >
                        <span>Deny</span>
                        <FcCancel className="text-2xl" />
                      </button>
                      {isOpen && (
                        <FeedbackModal
                          onClose={toggleModal}
                          handleFeedbackUpdate={handleFeedbackUpdate}
                        />
                      )}
                    </>
                  )}
                  {item?.status === "denied" && "Denied"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;

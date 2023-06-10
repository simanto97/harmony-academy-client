import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { FaRegEdit } from "react-icons/fa";
import UpdateModal from "../UpdateModal/UpdateModal";
import { toast } from "react-hot-toast";
// TODO: implement feedback options
const MyClasses = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const { user } = useContext(AuthContext);
  const { data: classes = [], refetch } = useQuery({
    queryKey: ["classes", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_HOSTING_URL}/classes?email=${user?.email}`
      );
      return res.json();
    },
  });

  const openModal = (id) => {
    fetch(`${import.meta.env.VITE_HOSTING_URL}/classes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedData(data[0]);
      });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleUpdate = (formData) => {
    
    const image = formData.photo[0];
    const photoData = new FormData();
    photoData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_KEY
    }`;
    fetch(url, {
      method: "POST",
      body: photoData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const imageUrl = imageData?.data?.display_url;
       
        const addedData = {
          ...formData,
          image: imageUrl,
        };

        // Handle the form submission here
        fetch(
          `${import.meta.env.VITE_HOSTING_URL}/classes/${selectedData._id}`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(addedData),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              refetch();
              toast.success("You updated the class");
            }
          })
          .catch((error) => toast.error(error.message));
        // console.log(formData);
        closeModal();
      });
  };
  return (
    <div className="md:w-4/5 mx-auto">
      <h2 className="text-3xl font-semibold">
        My added classes: {classes.length}
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Enrolled Students</th>
                <th>Available Seats</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((singleClass, index) => (
                <tr key={singleClass._id} className="hover:bg-gray-200">
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={singleClass?.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div className="font-bold">{singleClass?.name}</div>
                    </div>
                  </td>
                  <td className="text-right font-semibold">
                    $ {singleClass?.price}
                  </td>
                  <td className="text-center font-medium">
                    {singleClass?.enrolledStudents || 0}
                  </td>
                  <td className="font-medium">{singleClass?.availableSeats}</td>
                  <td className="font-medium">{singleClass?.status}</td>
                  {/* <td>
                    <FaRegEdit
                      onClick={() => handleUpdate(singleClass)}
                      className="text-3xl text-yellow-500"
                    />
                  </td> */}
                  <td>
                    {/* Render your website content here */}
                    <FaRegEdit
                      className="text-3xl text-yellow-500 hover:text-yellow-700"
                      onClick={() => openModal(singleClass._id)}
                    ></FaRegEdit>
                    {modalOpen && (
                      <UpdateModal
                        data={selectedData}
                        onSubmit={handleUpdate}
                        onCancel={closeModal}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyClasses;

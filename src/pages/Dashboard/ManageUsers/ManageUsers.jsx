import { useQuery } from "@tanstack/react-query";
import { GrUserAdmin } from "react-icons/gr";
import { GiTeacher } from "react-icons/gi";
import { RiDeleteBack2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import SectionTitle from "../../../components/SectionTitle";

// TODO: need to make admin and instructor implement
const ManageUsers = () => {
  const { data: allUsers = [], refetch } = useQuery(["users"], async () => {
    const res = await fetch(`${import.meta.env.VITE_HOSTING_URL}/users`);
    return res.json();
  });

  const handleMakeAdmin = (id) => {
    fetch(`${import.meta.env.VITE_HOSTING_URL}/users/admin/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success("You made the user as admin");
        }
      })
      .catch((error) => console.log(error));
  };
  const handleMakeInstructor = (id) => {
    fetch(`${import.meta.env.VITE_HOSTING_URL}/users/instructor/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success("You made the user as Instructor");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (singleUser) => {
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
        fetch(`${import.meta.env.VITE_HOSTING_URL}/users/${singleUser._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "User has been deleted.", "success");
            }
          });
      }
    });
  };
  return (
    <div className="md:w-4/5 mx-auto">
      <SectionTitle heading={"Manage Users"} />
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>status</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((singleUser, index) => (
                <tr key={singleUser._id}>
                  <td>{index + 1}</td>
                  <td>{singleUser.name}</td>
                  <td>{singleUser?.email}</td>
                  <td>{singleUser?.role}</td>
                  <td>
                    <div className="flex flex-row justify-start items-center gap-2 text-2xl">
                      <button
                        onClick={() => handleMakeInstructor(singleUser._id)}
                        className={`btn btn-warning ${
                          singleUser?.role === "instructor"
                            ? "disabled bg-gray-400 hover:bg-gray-400"
                            : ""
                        }`}
                      >
                        {" "}
                        <GiTeacher />
                      </button>
                      <button
                        onClick={() => handleMakeAdmin(singleUser._id)}
                        className={`btn btn-warning ${
                          singleUser?.role === "admin"
                            ? "disabled bg-gray-400 hover:bg-gray-400"
                            : ""
                        }`}
                      >
                        {" "}
                        <GrUserAdmin />
                      </button>
                    </div>
                  </td>
                  <td className="text-3xl text-red-600">
                    <RiDeleteBack2Fill
                      onClick={() => handleDelete(singleUser)}
                    />
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

export default ManageUsers;

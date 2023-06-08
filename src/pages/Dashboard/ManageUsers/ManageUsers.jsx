import { useQuery } from "@tanstack/react-query";
import { GrUserAdmin } from "react-icons/gr";
import { GiTeacher } from "react-icons/gi";
import { RiDeleteBack2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
// TODO: need to make admin and instructor implement
const ManageUsers = () => {
  const { data: allUsers = [], refetch } = useQuery(["users"], async () => {
    const res = await fetch(`${import.meta.env.VITE_HOSTING_URL}/users`);
    return res.json();
  });

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
      <h2 className="text-3xl font-semibold">Total users: {allUsers.length}</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
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
                  <td>
                    <div className="flex flex-row justify-center items-center gap-2 text-2xl">
                      <GiTeacher />
                      <GrUserAdmin />
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

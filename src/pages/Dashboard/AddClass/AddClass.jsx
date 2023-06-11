import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-hot-toast";
import SectionTitle from "../../../components/SectionTitle";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    // console.log(formData);
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
        // console.log(imageData);
        const imageUrl = imageData?.data?.display_url;
        const classData = {
          ...formData,
          enrolledStudents: 0,
          image: imageUrl,
          status: "pending",
        };
        // eslint-disable-next-line no-unused-vars
        const { photo, ...rest } = classData;
        fetch(`${import.meta.env.VITE_HOSTING_URL}/classes`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(rest),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              reset();
              toast.success("Class has been requested.Wait for Admin approval");
            }
          });
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="container mx-auto">
      <SectionTitle heading={"Add a Class"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg md:w-3/5 mx-auto p-4 border rounded-md border-gray-300 shadow-xl"
      >
        <div className="mb-4">
          <label htmlFor="image" className="block font-bold mb-1">
            Image
          </label>
          <input
            {...register("photo")}
            id="photo"
            type="file"
            className="border border-gray-300 p-2 w-full rounded transition duration-400 hover:border-[#00b0e4]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block font-bold mb-1">
            Class Name
          </label>
          <input
            {...register("name", { required: true })}
            id="name"
            type="text"
            className="border border-gray-300 p-2 w-full rounded transition duration-400 hover:border-[#00b0e4]"
          />
          {errors.name && (
            <span className="text-red-500">Name is required</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold mb-1">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            defaultValue={user?.email}
            className="border border-gray-300 p-2 w-full rounded transition duration-400 hover:border-[#00b0e4]"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="instructorName" className="block font-bold mb-1">
            Instructor Name
          </label>
          <input
            {...register("instructorName")}
            id="instructorName"
            type="text"
            defaultValue={user?.displayName}
            className="border border-gray-300 p-2 w-full transition rounded duration-400 hover:border-[#00b0e4]"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="availableSeats" className="block font-bold mb-1">
            Available Seats
          </label>
          <input
            {...register("availableSeats", { required: true })}
            id="availableSeats"
            type="number"
            className="border border-gray-300 p-2 w-full rounded transition duration-400 hover:border-[#00b0e4] appearance-none"
          />
          {errors.availableSeats && (
            <span className="text-red-500">Available Seats is required</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block font-bold mb-1">
            Price
          </label>
          <input
            {...register("price", { required: true })}
            id="price"
            type="number"
            className="border border-gray-300 p-2 w-full rounded transition duration-400 hover:border-blue-600 appearance-none"
          />
          {errors.price && (
            <span className="text-red-500">Price is required</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-[#00b0e4] text-white py-2 px-4 rounded hover:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddClass;

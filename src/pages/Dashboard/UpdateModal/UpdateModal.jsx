import { useForm } from "react-hook-form";

const UpdateModal = ({ data, onSubmit, onCancel }) => {
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
      <div className="bg-white rounded-lg p-8 relative z-20 w-2/5">
        <h2 className="text-xl font-semibold mb-4">Update Class Data</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              defaultValue={data?.name}
              className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor="photo"
            >
              Upload Photo
            </label>
            <input
              className="appearance-none bg-transparent border-b-2 border-white w-full py-2 px-3 text-black leading-tight focus:outline-none hover:border-blue-500"
              id="photo"
              type="file"
              placeholder="Upload your photo"
              {...register("photo")}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={data?.email}
              readOnly
              className="w-full border-gray-300 rounded-md px-4 py-2 bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="instructorName" className="block font-medium mb-1">
              Instructor Name
            </label>
            <input
              type="text"
              id="instructorName"
              value={data?.instructorName}
              readOnly
              className="w-full border-gray-300 rounded-md px-4 py-2 bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="availableSeats" className="block font-medium mb-1">
              Available Seats
            </label>
            <input
              type="number"
              id="availableSeats"
              {...register("availableSeats")}
              defaultValue={data?.availableSeats}
              className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block font-medium mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              {...register("price")}
              defaultValue={data?.price}
              className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-500 mr-2 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;

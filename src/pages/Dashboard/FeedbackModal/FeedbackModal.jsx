import { useForm } from "react-hook-form";

const FeedbackModal = ({ onClose, handleFeedbackUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleFeedbackUpdate(data.feedback);
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-lg w-1/2">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="feedback"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.feedback ? "border-red-500" : ""
                  }`}
                  {...register("feedback", {
                    required: "This field is required",
                    maxLength: {
                      value: 30,
                      message: "Maximum length is 30 characters",
                    },
                  })}
                />
                {errors.feedback && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.feedback.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
                <button
                  onClick={onClose}
                  className="ml-4 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;

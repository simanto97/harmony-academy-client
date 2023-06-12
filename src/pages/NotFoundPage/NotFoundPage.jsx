import { Link } from "react-router-dom";
import NotFoundGif from "../../assets/notfoundpage/notfoundpage.png";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">404 Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded"
      >
        Go to Home
      </Link>
      <img src={NotFoundGif} alt="404 Not Found" className="mb-8 h-3/5" />
    </div>
  );
};

export default NotFoundPage;

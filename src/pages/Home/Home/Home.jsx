import Banner from "../Banner/Banner";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import Reviews from "../Reviews/Reviews";

const Home = () => {
  return (
    <div>
      <Banner />
      <PopularClasses />
      <PopularInstructors />
      <Reviews />
    </div>
  );
};

export default Home;

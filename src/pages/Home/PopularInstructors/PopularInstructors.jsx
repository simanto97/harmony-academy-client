import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper";
import SectionTitle from "../../../components/SectionTitle";

const PopularInstructors = () => {
  const { data: popularInstructors = [] } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_HOSTING_URL}/popular-instructors`
      );
      return res.json();
    },
  });

  return (
    <>
      <SectionTitle heading={"Popular Instructors"} />
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper w-4/5"
      >
        {popularInstructors.map((item) => (
          <SwiperSlide key={item._id} className="w-96">
            <div className="card glass w-96 mx-auto">
              <figure>
                <img src={item?.image} alt="car!" />
              </figure>
              <div className="card-body mx-auto">
                <h2 className="card-title"> Name: {item?.name}</h2>
                <p>Email: {item?.email}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default PopularInstructors;

import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFlip, Pagination, Navigation } from "swiper";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";

const Reviews = () => {
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_HOSTING_URL}/reviews`);
      return res.json();
    },
  });
  return (
    <div className="my-8">
      <Swiper
        effect={"flip"}
        grabCursor={true}
        pagination={true}
        navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        className="mySwiper md:w-3/5 h-[400px] my-4 mx-2"
      >
        {reviews.map((item) => (
          <SwiperSlide key={item._id} className="my-auto">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden text-center px-4">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item?.name}</h3>
                <div className="my-3 text-xl">
                  <Rating
                    className="text-warning"
                    placeholderRating={item?.rating}
                    emptySymbol={<FaRegStar />}
                    placeholderSymbol={<FaStar />}
                    fullSymbol={<FaStar />}
                    readonly
                  />{" "}
                  <span>{item?.rating}</span>
                </div>
                <p className="text-gray-600">{item?.review}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;

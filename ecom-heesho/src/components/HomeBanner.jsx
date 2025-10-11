import bannerImageOne from "../assets/slides/sli01.jpg";
import bannerImageTwo from "../assets/slides/sli02.webp";
import bannerImageThree from "../assets/slides/sli03.jpg";
import { Carousel } from "react-bootstrap";

const HomeBanner = () => {
  return (
    <Carousel fade interval={3000} pause="hover">
      <Carousel.Item>
        <img
          className="d-block w-100 banner-image"
          src={bannerImageOne}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Big Festive Sale</h3>
          <p>Up to 70% off on all categories</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 banner-image"
          src={bannerImageTwo}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>New Arrivals</h3>
          <p>Explore the latest fashion and trends</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 banner-image"
          src={bannerImageThree}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Clearance Sale</h3>
          <p>Last chance to grab your favorites</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HomeBanner;
/*
const HeroBanner = () => {
  return (
    <div className="py-2 rounded-md">
      <Swiper
        grabCursor={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation
        modules={[Pagination, EffectFade, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
      >
        {bannerLists.map((item, i) => (
          <SwiperSlide key={item.id}>
            <div
              className={`carousel-item rounded-md sm:h-[500px] h-96 ${colors[i]}`}
            >
              <div className="flex items-center justify-center">
                <div className="hidden lg:flex justify-center w-1/2 p-8">
                  <div className="text-center">
                    <h3 className="text-3xl text-white font-bold">
                      {item.title}
                    </h3>
                    <h1 className="text-5xl text-white font-bold mt-2">
                      {item.subtitle}
                    </h1>
                    <p className="text-white font-bold mt-4">
                      {item.description}
                    </p>
                    <Link
                      className="mt-6 inline-block bg-black text-white py-2 px-4 rounded-sm hover:bg-gray-800"
                      to="/products"
                    >
                      Shop
                    </Link>
                  </div>
                </div>
                <div className="w-full flex justify-center lg:w-1/2 p-4">
                  <img src={item?.image}></img>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
*/

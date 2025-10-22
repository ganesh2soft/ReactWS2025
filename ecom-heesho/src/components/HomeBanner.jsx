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

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Carousel({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-[#0D1117] border border-[#30363d] rounded-lg overflow-hidden">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx}>
            <img
              src={`http://localhost:5000/${img}`}
              alt={`Slide ${idx}`}
              className="w-full h-64 object-cover rounded"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;

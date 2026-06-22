import { useState } from "react";
import "../styles/hero.css";

function Hero() {
  const banners = [
    "/banner2.png",
    "/hopdongdientu2.jpg",
    "/chukyso.jpg",
    "/hkd1.jpg",
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  return (
    <section className="hero-slider">
      <div className="hero-image-container">
        <img
          src={banners[current]}
          alt={`Banner ${current + 1}`}
          className="hero-image"
        />

        <button
          className="hero-arrow hero-arrow-left"
          onClick={prevSlide}
        >
          ❮
        </button>

        <button
          className="hero-arrow hero-arrow-right"
          onClick={nextSlide}
        >
          ❯
        </button>

        <div className="hero-dots">
          {banners.map((_, index) => (
            <span
              key={index}
              className={
                current === index
                  ? "hero-dot active"
                  : "hero-dot"
              }
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
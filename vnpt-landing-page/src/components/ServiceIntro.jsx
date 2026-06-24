import { useEffect, useState } from "react";
import "../styles/serviceIntro.css";
import { useNavigate } from "react-router-dom";

function ServiceIntro() {

  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [index, setIndex] = useState(0);

  const [cardsPerView, setCardsPerView] =
    useState(4);

  useEffect(() => {

    fetch(
      "http://localhost:5000/services/internet-home" 
    )
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.log(err));

  }, []);

  useEffect(() => {

    const updateView = () => {

      if(window.innerWidth <= 768){

        setCardsPerView(1);

      }
      else if(window.innerWidth <= 992){

        setCardsPerView(2);

      }
      else{

        setCardsPerView(4);

      }

    };

    updateView();

    window.addEventListener(
      "resize",
      updateView
    );

    return () =>
      window.removeEventListener(
        "resize",
        updateView
      );

  }, []);

  const next = () => {

    if(
      index <
      services.length - cardsPerView
    ){
      setIndex(index + 1);
    }

  };

  const prev = () => {

    if(index > 0){
      setIndex(index - 1);
    }

  };

  return (

    <section className="service-intro">

      <div className="container">

        <h2>
          CÁC GÓI CƯỚC KHUYẾN MÃI
        </h2>

        <div className="slider-wrapper">

          <button
            className="slider-btn"
            onClick={prev}
            disabled={index === 0}
          >
            ❮
          </button>

          <div className="slider-window">

            <div
              className="slider-track"
              style={{
                transform:
                  `translateX(-${
                    index *
                    (100 / cardsPerView)
                  }%)`
              }}
            >

              {services.map(service => (

                <div
                  className="service-card"
                  key={service._id}
                  onClick={() =>
                    navigate(
                      `/san-pham/${service._id}`
                    )
                  }
                >

                  <div className="service-card-body">

                    <img
                      src={service.image}
                      alt={service.title}
                    />

                    <h3>
                      {service.title}
                    </h3>

                    <p>
                      {service.description}
                    </p>

                    <span className="service-price">
                      {service.price}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

          <button
            className="slider-btn"
            onClick={next}
            disabled={
              index >=
              services.length -
              cardsPerView
            }
          >
            ❯
          </button>

        </div>

      </div>

    </section>

  );

}

export default ServiceIntro;
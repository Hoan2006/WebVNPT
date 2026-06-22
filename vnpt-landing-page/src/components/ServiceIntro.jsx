import { useEffect, useState } from "react";
import "../styles/serviceIntro.css";
import { useNavigate } from "react-router-dom";

function ServiceIntro() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {

    fetch(
      "http://localhost:5000/services/internet-home"
    )
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.log(err));

  }, []);

  const next = () => {

    if(index < services.length - 4){
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
          >  
            ❮
          </button>

          <div className="slider-window">

            <div
              className="slider-track"
              style={{
                transform:
                  `translateX(-${index * 25}%)`
              }}
            >

              {services.map(service => (

  <div
    className="service-card"
    key={service._id}
    onClick={() =>
      navigate(`/san-pham/${service._id}`)
    }
  >

    <img
      src={service.image}
      alt={service.title}
    />

    <div className="service-card-body">

      <h3>{service.title}</h3>

      <p>{service.description}</p>

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
          >
            ❯
          </button>

        </div>

      </div>

    </section>

  );

}

export default ServiceIntro;
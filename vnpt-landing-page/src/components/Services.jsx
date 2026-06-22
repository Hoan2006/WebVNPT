import { useEffect, useState } from "react";

import {
  useRegister
} from "../context/RegisterContext";

import "../styles/services.css";

function Services() {

  const [services, setServices] =
    useState([]);

  const {
    setShowRegister
  } = useRegister();

  useEffect(() => {

    fetch("http://localhost:5000/services")
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.log(err));

  }, []);

  return (
 
    <section className="services">

      <div className="container">

        <h2 className="section-title">
          CÁC DỊCH VỤ NỔI BẬT
        </h2>
 
        <div className="service-grid">

          {services.map(service => (

            <div
              className="service-card"
              key={service._id}
            >

              <img
                src={service.image}
                alt={service.title}
              />

              <div className="service-body">

                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.description}
                </p>

                <ul>

                  {service.features?.map(
                    (item, index) => (

                      <li key={index}>
                        {item}
                      </li>

                    )
                  )}

                </ul>

                <button
                  onClick={() =>
                    setShowRegister(true)
                  }
                >
                  Đăng ký ngay
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}

export default Services;
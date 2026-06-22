import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useEffect, useState } from "react";

import "../styles/news.css";

function News() {

  const [news, setNews] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/news")
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <>
      <Header />
      <Navbar />

      <section className="news-page">

        <div className="container">

          <h1 className="news-title">
            TIN TỨC & SỰ KIỆN
          </h1>

          <div className="news-grid">

            {news.map((item) => (

              <Link
                to={`/tin-tuc/${item._id}`}
                key={item._id}
                className="news-card"
              >

                <img
                  src={item.image}
                  alt={item.title}
                />

                <div className="news-content">

                  <span className="news-category">
                    {item.category}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.date}
                  </p>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>

      <Footer />
    </>
  );

}

export default News;
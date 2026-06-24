import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useEffect, useState } from "react";

import "../styles/news.css";

function News() {

  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] =
    useState(1);

  const newsPerPage = 6;

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

  const indexOfLastNews =
    currentPage * newsPerPage;

  const indexOfFirstNews =
    indexOfLastNews - newsPerPage;

  const currentNews =
    news.slice(
      indexOfFirstNews,
      indexOfLastNews
    );

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        news.length / newsPerPage
      )
    );

  const paginate = (pageNumber) => {

    setCurrentPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

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

            {currentNews.map((item) => (

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

          <div className="pagination">

            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() =>
                paginate(currentPage - 1)
              }
            >
              ←
            </button>

            {[...Array(
              totalPages || 1
            )].map((_, index) => (

              <button
                key={index}
                className={
                  currentPage === index + 1
                    ? "page-btn active"
                    : "page-btn"
                }
                onClick={() =>
                  paginate(index + 1)
                }
              >
                {index + 1}
              </button>

            ))}

            <button
              className="page-btn"
              disabled={
                currentPage === totalPages ||
                totalPages === 0
              }
              onClick={() =>
                paginate(currentPage + 1)
              }
            >
              →
            </button>

          </div>

        </div>

      </section>
 
      <Footer />
    </>
  );

}

export default News;
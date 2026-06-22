import { useParams } from "react-router-dom";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  useEffect,
  useState
} from "react";

import "../styles/newsDetail.css";

function NewsDetail() {
  const { id } = useParams();

  const [article, setArticle] =
    useState(null);

  useEffect(() => {

    fetch(
      `http://localhost:5000/news/${id}`
    )
      .then(res => res.json())
      .then(data => {
        setArticle(data);
      });

  }, [id]);

  if (!article) {
    return <h2>Đang tải...</h2>;
  }

  return (
    <>
      <Header />
      <Navbar />

      <section className="article-page">
        <div className="container article-container">

          <span className="article-category">
            {article.category}
          </span>

          <h1>{article.title}</h1>

          <div className="article-meta">
            {article.author} • {article.date}
          </div>

          <div
            className="article-content"
            dangerouslySetInnerHTML={{
              __html: article.content,
            }}
          />

        </div>
      </section>

      <Footer />
    </>
  );
}

export default NewsDetail;
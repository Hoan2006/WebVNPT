import {
  useEffect,
  useState
} from "react";

import AdminLayout
from "../components/AdminLayout";
import { toast } from "react-toastify";
import NewsModal from "../components/NewsModal";
import {
  getNews,
  createNews,
  updateNews,
  deleteNews
}
from "../../services/newsService";

import "../styles/news.css";

function NewsAdmin(){ 

  const [news,setNews] =
  useState([]);

  const [search,setSearch] =
  useState("");

  const [showModal,setShowModal] =
  useState(false);

  const [editingNews,setEditingNews] =
  useState(null);

  const [deleteId,setDeleteId] =
  useState(null);

  const [page,setPage] =
  useState(1);

  const limit = 5;

  useEffect(() => {
    loadNews();
  },[]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const loadNews =
  async () => {

    const res =
    await getNews();

    setNews(res.data);

  };

  const handleAdd = () => {
    setEditingNews(null);
    setShowModal(true);
  };

  const handleEdit =
  (item) => {

    setEditingNews(item);

    setShowModal(true);

  };

  const handleDelete =
  (id) => {
    setDeleteId(id);
  };

  const filtered =
  news.filter(item =>
    item.title
    ?.toLowerCase()
    .includes(
      search.toLowerCase()
    )
  );

  const confirmDelete =
  async () => {

    try {

      await deleteNews(
        deleteId
      );

      toast.success(
        "Xóa bài viết thành công"
      );

      loadNews();

    } catch(error){

      toast.error(
        "Xóa bài viết thất bại"
      );

    } finally {

      setDeleteId(null);

    }

  };

  const start =
  (page - 1) * limit;

  const end =
  start + limit;

  const paginated =
  filtered.slice(start,end);

  return(
    <AdminLayout>

      <div className="news-page">

        <div className="page-header">

          <h1>
            Quản lý tin tức
          </h1>

          <button
            className="add-btn"
            onClick={handleAdd}
          >
            + Thêm mới
          </button>

        </div>

        <div className="toolbar">

          <input
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        <table className="news-table">

          <thead>
            <tr>

              <th>Ảnh</th>
              <th>Tiêu đề</th>
              <th>Loại</th>
              <th>Ngày</th>
              <th>Mô tả</th>
              <th></th>

            </tr>
          </thead>

          <tbody>

            {paginated.map(item => (

              <tr key={item._id}>

                <td>

                  <img
                    src={item.image}
                    alt=""
                    className="news-img"
                  />

                </td>

                <td className="title-cell">

                  <div className="admin-news-title">
                    {item.title}
                  </div>

                </td>

                <td>
                  {item.category}
                </td>

                <td>
                  {item.date}
                </td>

                <td className="excerpt-cell">

                  <div className="news-excerpt">
                    {item.excerpt}
                  </div>

                </td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(item)
                    }
                  >
                    Sửa
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        item._id
                      )
                    }
                  >
                    Xóa
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="pagination">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
          >
            Trước
          </button>

          <span>
            Trang {page}
          </span>

          <button
            disabled={
              end >= filtered.length
            }
            onClick={() =>
              setPage(page + 1)
            }
          >
            Sau
          </button>

        </div>

      </div>

      {showModal && (
        <NewsModal
          news={editingNews}
          onClose={() =>
            setShowModal(false)
          }
          onSuccess={() => {
            loadNews();
            setShowModal(false);
          }}
        />
      )}

      {
        deleteId && (

          <div className="confirm-overlay">

            <div className="confirm-modal">

              <div className="confirm-icon">
                🗑️
              </div>

              <h3>
                Xóa bài viết
              </h3>

              <p>
                Bạn có chắc muốn xóa
                bài viết này không?
              </p>

              <div className="confirm-actions">

                <button
                  className="cancel-delete"
                  onClick={() =>
                    setDeleteId(null)
                  }
                >
                  Hủy
                </button>

                <button
                  className="confirm-delete"
                  onClick={
                    confirmDelete
                  }
                >
                  Xóa
                </button>

              </div>

            </div>

          </div>

        )
      }

    </AdminLayout>
  );
}

export default NewsAdmin;
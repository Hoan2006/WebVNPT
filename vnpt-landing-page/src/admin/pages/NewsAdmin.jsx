import {
  useEffect,
  useState
} from "react";

import AdminLayout
from "../components/AdminLayout";

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

  const [editingId,setEditingId] =
  useState(null);

  const [page,setPage] =
  useState(1);

  const limit = 5;

  const [form,setForm] =
  useState({
    title:"",
    date:"",
    author:"",
    image:"",
    category:"",
    excerpt:"",
    content:""
  });

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

  const handleChange =
  (e) => {

    setForm({
      ...form,
      [e.target.name]:
      e.target.value
    });

  };

  const handleAdd = () => {

    setEditingId(null);

    setForm({
      title:"",
      date:"",
      author:"",
      image:"",
      category:"",
      excerpt:"",
      content:""
    });

    setShowModal(true);

  };

  const handleEdit =
  (item) => {

    setEditingId(item._id);

    setForm(item);

    setShowModal(true);

  };

  const handleSave =
  async () => {

    if(editingId){

      await updateNews(
        editingId,
        form
      );

    }
    else{

      await createNews(
        form
      );

    }

    setShowModal(false);

    loadNews();

  };

  const handleDelete =
  async(id) => {

    const ok =
    window.confirm(
      "Xóa bài viết?"
    );

    if(!ok) return;

    await deleteNews(id);

    loadNews();

  };

  const filtered =
  news.filter(item =>
    item.title
    ?.toLowerCase()
    .includes(
      search.toLowerCase()
    )
  );

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

        <div className="modal">

          <div className="modal-content">

            <h2>
              {editingId
              ? "Cập nhật bài viết"
              : "Thêm bài viết"}
            </h2>

            <input
              name="title"
              placeholder="Tiêu đề"
              value={form.title}
              onChange={handleChange}
            />

            <input
              name="date"
              placeholder="Ngày đăng"
              value={form.date}
              onChange={handleChange}
            />

            <input
              name="author"
              placeholder="Tác giả"
              value={form.author}
              onChange={handleChange}
            />

            <input
              name="image"
              placeholder="URL ảnh"
              value={form.image}
              onChange={handleChange}
            />

            {
              form.image && (
                <div className="image-preview">

                  <img
                    src={form.image}
                    alt=""
                  />

                </div>
              )
            }

            <input
              name="category"
              placeholder="Chuyên mục"
              value={form.category}
              onChange={handleChange}
            />

            <textarea
              name="excerpt"
              placeholder="Mô tả ngắn"
              value={form.excerpt}
              onChange={handleChange}
            />

            <textarea
              name="content"
              rows="12"
              placeholder="Nội dung HTML"
              value={form.content}
              onChange={handleChange}
            />

            <div className="modal-actions">

              <button
                onClick={handleSave}
              >
                Lưu
              </button>

              <button
                onClick={() =>
                  setShowModal(false)
                }
              >
                Hủy
              </button>

            </div>

          </div>

        </div>

      )}

    </AdminLayout>
  );
}

export default NewsAdmin;
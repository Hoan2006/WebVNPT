import {
  useState
} from "react";

import {
  createService,
  updateService,
  uploadImage
} from "../../services/serviceService";

import { toast }
from "react-toastify";

import "../styles/serviceModal.css";

function ServiceModal({
  service,
  onClose,
  onSuccess,
}) {

  const [loading,setLoading] =
    useState(false);

  const [imageFile,setImageFile] =
    useState(null);

  const [form,setForm] =
    useState({

      title:
        service?.title || "",

      description:
        service?.description || "",

      image:
        service?.image || "",

      features:
        service?.features || [""],

    });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
      e.target.value
    });

  };

  const handleImageChange =
  (e) => {

    const file =
      e.target.files[0];

    if(!file) return;

    setImageFile(file);

    setForm({
      ...form,
      image:
        URL.createObjectURL(
          file
        )
    });

  };

  const addFeature = () => {

    setForm({
      ...form,
      features:[
        ...form.features,
        ""
      ]
    });

  };

  const removeFeature =
  (index) => {

    setForm({
      ...form,
      features:
      form.features.filter(
        (_,i)=>
          i !== index
      )
    });

  };

  const handleFeatureChange =
  (index,value) => {

    const updated =
      [...form.features];

    updated[index] =
      value;

    setForm({
      ...form,
      features:updated
    });

  };

  const handleSubmit =
  async () => {

    try {

      setLoading(true);

      let imageUrl =
        form.image;

      if(imageFile){

        const uploadRes =
          await uploadImage(
            imageFile
          );

        imageUrl =
          uploadRes.data.imageUrl;

      }

      const payload = {

        title:
          form.title,

        description:
          form.description,

        image:
          imageUrl,

        features:
          form.features.filter(
            Boolean
          ),

      };

      if(service?._id){

        await updateService(
          service._id,
          payload
        );

        toast.success(
          "Cập nhật dịch vụ thành công"
        );

      } else {

        await createService(
          payload
        );

        toast.success(
          "Thêm dịch vụ thành công"
        );

      }

      onSuccess();

    } catch(error){

      console.log(error);

      toast.error(
        service
        ? "Cập nhật thất bại"
        : "Thêm mới thất bại"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="pm-overlay">

      <div className="pm-modal">

        <div className="pm-header">

          <h2>
            {
              service
              ? "Cập nhật dịch vụ"
              : "Thêm dịch vụ"
            }
          </h2>

          <button
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <div className="pm-section">

          <h3>
            Thông tin dịch vụ
          </h3>

          <label>
            Tên dịch vụ
          </label>

          <input
            name="title"
            value={form.title}
            onChange={
              handleChange
            }
          />

          <label>
            Mô tả
          </label>

          <textarea
            rows="4"
            name="description"
            value={
              form.description
            }
            onChange={
              handleChange
            }
          />

          <label>
            Hình ảnh
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={
              handleImageChange
            }
          />

          {form.image && (

            <div className="pm-preview">

              <img
                src={form.image}
                alt=""
              />

            </div>

          )}

        </div>

        <div className="pm-section">

          <h3>
            Danh sách tính năng
          </h3>

          {
            form.features.map(
              (
                feature,
                index
              ) => (

                <div
                  className="feature-row"
                  key={index}
                >

                  <input
                    value={feature}
                    placeholder={`Tính năng ${
                      index + 1
                    }`}
                    onChange={(e)=>
                      handleFeatureChange(
                        index,
                        e.target.value
                      )
                    }
                  />

                  <button
                    type="button"
                    className="delete-feature"
                    onClick={() =>
                      removeFeature(
                        index
                      )
                    }
                  >
                    ×
                  </button>

                </div>

              )
            )
          }

          <button
            type="button"
            className="add-feature"
            onClick={
              addFeature
            }
          >
            + Thêm tính năng
          </button>

        </div>

        <div className="pm-actions">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Hủy
          </button>

          <button
            className="save-btn"
            disabled={loading}
            onClick={
              handleSubmit
            }
          >
            {
              loading
              ? "Đang lưu..."
              : "Lưu"
            }
          </button>

        </div>

      </div>

    </div>

  );
}

export default ServiceModal;
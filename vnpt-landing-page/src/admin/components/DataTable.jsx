import React from "react";
import "../styles/table.css";

const DataTable = ({
  columns,
  data,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>
                {col.label}
              </th>
            ))}

            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.key}>
                  {item[col.key]}
                </td>
              ))}

              <td>
                <button
                  className="btn-edit"
                  onClick={() => onEdit(item)}
                >
                  Sửa
                </button>

                <button
                  className="btn-delete"
                  onClick={() => onDelete(item)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
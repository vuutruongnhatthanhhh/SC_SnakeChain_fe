import React from "react";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";

interface TableProps<T> {
  columns: { label: string; key: keyof T }[];
  data: T[];
  handleView?: (item: T) => void;
  handleEdit?: (item: T) => void;
  handleDelete?: (item: T) => void;
}

const Table = <T extends {}>({
  columns,
  data,
  handleView,
  handleEdit,
  handleDelete,
}: TableProps<T>) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          {columns.map((column, index) => (
            <th key={index} className="border p-2">
              {column.label}
            </th>
          ))}
          {(handleView || handleEdit || handleDelete) && (
            <th className="border p-2"></th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length + 1}
              className="text-center p-4 text-gray-500"
            >
              Không có dữ liệu
            </td>
          </tr>
        ) : (
          data.map((row, index) => (
            <tr key={index} className="text-center">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="border p-2">
                  {String(row[column.key as keyof T])}{" "}
                </td>
              ))}
              {(handleView || handleEdit || handleDelete) && (
                <td className="border p-2">
                  {handleView && (
                    <button
                      onClick={() => handleView(row)}
                      className="text-orange-500 mr-2"
                    >
                      <FiEye />
                    </button>
                  )}
                  {handleEdit && (
                    <button
                      onClick={() => handleEdit(row)}
                      className="text-blue-500 mr-2"
                    >
                      <FiEdit />
                    </button>
                  )}
                  {handleDelete && (
                    <button
                      onClick={() => handleDelete(row)}
                      className="text-red-500"
                    >
                      <FiTrash />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;

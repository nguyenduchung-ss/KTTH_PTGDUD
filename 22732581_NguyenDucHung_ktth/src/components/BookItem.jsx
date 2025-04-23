// components/BookItem.jsx
import React from 'react'

const BookItem = ({ book, onDelete, onEdit }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-2">{book.title}</td>
      <td className="p-2">{book.author}</td>
      <td className="p-2">{book.genre}</td>
      <td className="p-2">{book.year}</td>
      <td className="p-2 space-x-2">
        <button
          onClick={() => onEdit(book)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
        >
          Sửa
        </button>
        <button
          onClick={() => onDelete(book.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Xoá
        </button>
      </td>
    </tr>
  )
}

export default BookItem

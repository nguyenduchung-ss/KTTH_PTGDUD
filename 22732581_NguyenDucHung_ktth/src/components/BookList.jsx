import React, { useState } from 'react'

const initialBooks = [
  { id: 1, title: "Đắc nhân tâm", author: "Dale Carnegie", genre: "Kỹ năng sống", year: 1936 },
  { id: 2, title: "Dế mèn phiêu lưu ký", author: "Tô Hoài", genre: "Văn học thiếu nhi", year: 1941 },
  { id: 3, title: "Lão Hạc", author: "Nam Cao", genre: "Văn học hiện thực", year: 1943 },
]

const BookList = () => {
  const [books, setBooks] = useState(initialBooks)

  const handleDelete = (id) => {
    setBooks(books.filter(book => book.id !== id))
  }

  return (
    <div className="bg-white shadow-md rounded p-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Tên sách</th>
            <th className="p-2">Tác giả</th>
            <th className="p-2">Thể loại</th>
            <th className="p-2">Năm</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id} className="border-b">
              <td className="p-2">{book.title}</td>
              <td className="p-2">{book.author}</td>
              <td className="p-2">{book.genre}</td>
              <td className="p-2">{book.year}</td>
              <td className="p-2">
                <button 
                  onClick={() => handleDelete(book.id)} 
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
          {books.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4">Không còn sách nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default BookList

import React, { useState, useEffect } from 'react'

const LOCAL_KEY = "book_list"

const initialBooks = [
  { id: 1, title: "Đắc nhân tâm", author: "Dale Carnegie", genre: "Kỹ năng sống", year: 1936 },
  { id: 2, title: "Dế mèn phiêu lưu ký", author: "Tô Hoài", genre: "Văn học thiếu nhi", year: 1941 },
  { id: 3, title: "Lão Hạc", author: "Nam Cao", genre: "Văn học hiện thực", year: 1943 },
  { id: 4, title: "Sapiens", author: "Yuval Noah Harari", genre: "Khoa học", year: 2011 },
  { id: 5, title: "Tâm lý học tội phạm", author: "David Canter", genre: "Tâm lý", year: 2008 },
]

const loadBooksFromLocalStorage = () => {
  const data = localStorage.getItem(LOCAL_KEY)
  return data ? JSON.parse(data) : []
}

const BookList = () => {
  const [books, setBooks] = useState(() => {
    const localData = loadBooksFromLocalStorage()
    return localData.length > 0 ? localData : initialBooks
  })

  const [newBook, setNewBook] = useState({ title: '', author: '', genre: '', year: '' })
  const [searchText, setSearchText] = useState('')
  const [selectedGenre, setSelectedGenre] = useState("Tất cả")

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(books))
  }, [books])

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewBook(prev => ({ ...prev, [name]: value }))
  }

  const handleAddBook = () => {
    if (!newBook.title || !newBook.author || !newBook.genre || !newBook.year) {
      alert("Vui lòng nhập đầy đủ thông tin!")
      return
    }
    const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1
    const bookToAdd = { ...newBook, id: newId, year: parseInt(newBook.year) }
    setBooks(prev => [...prev, bookToAdd])
    setNewBook({ title: '', author: '', genre: '', year: '' })
  }

  const handleDelete = (id) => {
    setBooks(books.filter(book => book.id !== id))
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value)
  }

  const filteredBooks = books.filter(book => {
    const matchTitle = book.title.toLowerCase().includes(searchText.toLowerCase())
    const matchGenre = selectedGenre === "Tất cả" || book.genre === selectedGenre
    return matchTitle && matchGenre
  })

  return (
    <div className="bg-white shadow-md rounded p-4 max-w-5xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-3">Tìm kiếm & Lọc sách</h2>
      <input
        type="text"
        placeholder="Nhập tên sách để tìm..."
        value={searchText}
        onChange={handleSearchChange}
        className="w-full border p-2 rounded mb-4"
      />

      <div className="mb-6">
        <label className="font-medium mr-2">Lọc theo thể loại:</label>
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          className="border p-2 rounded"
        >
          <option value="Tất cả">Tất cả</option>
          <option value="Văn học">Văn học</option>
          <option value="Văn học thiếu nhi">Văn học thiếu nhi</option>
          <option value="Văn học hiện thực">Văn học hiện thực</option>
          <option value="Kỹ năng sống">Kỹ năng sống</option>
          <option value="Tâm lý">Tâm lý</option>
          <option value="Khoa học">Khoa học</option>
          <option value="Công nghệ">Công nghệ</option>
        </select>
      </div>

      <h2 className="text-xl font-semibold mb-3">Thêm sách mới</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4">
        <input
          type="text"
          name="title"
          placeholder="Tên sách"
          value={newBook.title}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="author"
          placeholder="Tác giả"
          value={newBook.author}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="genre"
          placeholder="Thể loại"
          value={newBook.genre}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="year"
          placeholder="Năm"
          value={newBook.year}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <button
        onClick={handleAddBook}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        Thêm sách
      </button>

      <h2 className="text-xl font-semibold mb-2">Danh sách sách</h2>
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
          {filteredBooks.map(book => (
            <tr key={book.id} className="border-b hover:bg-gray-50">
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
          {filteredBooks.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">Không tìm thấy sách nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default BookList

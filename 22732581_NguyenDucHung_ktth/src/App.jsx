import { useState } from 'react'
import './App.css'
import BookList from './components/BookList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Danh sách sách</h1>
      <BookList />
    </div>
    </>
  )
}

export default App

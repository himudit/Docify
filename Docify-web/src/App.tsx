import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DocumentPage from './pages/DocumentPage'
import Singup from './pages/Singup'
import Login from './pages/Login'
function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/docs/:docId' element={<DocumentPage />} />
      <Route path='/signup' element={<Singup />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App

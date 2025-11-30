import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/common/Navbar'
import Login from './components/cores/auth/login'
import Footer from './components/common/Footer'

function App() {

  return (
    <main className='app-main'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Navigate to={'/login'} replace/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <Footer/>
    </main>
  )
}

export default App

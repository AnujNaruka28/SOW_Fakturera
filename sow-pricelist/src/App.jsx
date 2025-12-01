import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/cores/auth/login'
import Pricelist from './components/cores/dashboard/pricelist/Pricelist';
import DashboardLayout from './components/common/layouts/DashboardLayout';
import PublicLayout from './components/common/layouts/PublicLayout'

function App() {

  return (
    <main>
      
      <Routes>

        <Route element={<PublicLayout/>}>
          <Route path='/' element={<Navigate to={'/login'} replace/>}/>
          <Route path='/login' element={<Login/>}/>
        </Route>
        
        <Route path='/dashboard' element={<DashboardLayout/>}>
          <Route path='pricelist' element={<Pricelist/>}/>
        </Route>

      </Routes>

    </main>
  )
}

export default App

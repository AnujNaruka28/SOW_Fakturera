import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/cores/auth/login'
import Pricelist from './components/cores/dashboard/pricelist/Pricelist';
import DashboardLayout from './components/common/layouts/DashboardLayout';
import PublicLayout from './components/common/layouts/PublicLayout'
import NotFound from './components/common/NotFound';
import { useMobilePortrait } from './hooks/useMobilePortrait';
import Terms from './components/common/documents/Terms';
import { PrivateRoute } from './components/cores/auth/privateroute';

function App() {

  const isMobilePortrait = useMobilePortrait();
  return (
    <>
      
      <Routes>

        <Route element={<PublicLayout/>}>
          <Route path='/' element={<Navigate to={'/login'} replace/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<NotFound/>} />
          {
            isMobilePortrait && <Route path='/terms' element={<Terms/>}/>
          }
        </Route>
        
        <Route path='/dashboard' element={
          <PrivateRoute>
            <DashboardLayout/>
          </PrivateRoute>
          }>
          <Route path='pricelist' element={<Pricelist/>}/>
          <Route path='log-out' element={<Navigate to={'/login'} replace/>}/>
          <Route path='*' element={<NotFound/>} />
        </Route>

      </Routes>

    </>
  )
}

export default App

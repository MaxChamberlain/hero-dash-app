import './App.css';
import './assets/main.css'
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Splash from './pages/Splash/Splash';
import Settings from './pages/Settings/Settings';
import User from './pages/User/User';
import PickerPacker from './pages/PickerPacker/PickerPacker';
import Packages from './pages/Packages/Packages';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import FuncReset from './pages/ResetPassword/FuncReset';
import DHLShipping from './pages/DHLShipping/DHLShipping';
import PicksDataContext from './contexts/DataContext';
import CompanyContext from './contexts/CompanyContext';
import { useEffect } from 'react';


function App() {

  const location = useLocation();
  const navigate = useNavigate();

  let isAdmin = false
  let canManage = false

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('@ViDash:_userInfo')) && JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token) {
      if(location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/' || location.pathname === '/resetpassword' || location.pathname === '/reset') {
        navigate('/home')
        window.location.href = '/home'
      }
    }else{
      if(location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/' && location.pathname !== '/resetpassword' && location.pathname !== '/reset') {
        navigate('/')
        window.location.href = '/'
      }
    }
    if(JSON.parse(localStorage.getItem('@ViDash:_userInfo')) && JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin) {
      isAdmin = true
      canManage = true
    }
    if(JSON.parse(localStorage.getItem('@ViDash:_userInfo')) && JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canManage){
      canManage = true
    }
  }, [location.pathname])

  return (
    <>
      {(location.pathname === '/login' || location.pathname === '/' || location.pathname === '/register' || location.pathname === '/resetpassword' || location.pathname === '/reset') || <Header />}
      <div className="App-header flex justify-center items-center font-mono">
        <PicksDataContext>
          <CompanyContext>
            <AnimatePresence mode='wait'>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Splash />} />
                <Route path='/home' element={<HomePage /> } />
                <Route path='/login' element={<Login /> } /> 
                <Route path='/register' element={<Register /> } /> 
                <Route path='/settings' element={
                  ((JSON.parse(localStorage.getItem('@ViDash:_userInfo')) && JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canManage) || (JSON.parse(localStorage.getItem('@ViDash:_userInfo')) && JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin)) ? 
                    <Settings /> : 
                    <Navigate replace to={'/'} />
                  } />
                <Route path='/user/:id' element={JSON.parse(localStorage.getItem('@ViDash:_userInfo')) && JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canManage ? <User /> : <Navigate replace to={"/"} />} />
                <Route path='/kpis/picking_and_packing' element={<PickerPacker />} />
                <Route path='/kpis/packages_shipping' element={JSON.parse(localStorage.getItem('@ViDash:_userInfo')) && (JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canDrillDown || JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin) ? <Packages /> : <Navigate replace to={"/"} />} />
                <Route path='/kpis/dhl_shipping' element={JSON.parse(localStorage.getItem('@ViDash:_userInfo')) && (JSON.parse(localStorage.getItem('@ViDash:_userInfo')).canDrillDown || JSON.parse(localStorage.getItem('@ViDash:_userInfo')).isAdmin) ? <DHLShipping /> : <Navigate replace to={"/"} />} />
                <Route path='/resetpassword' element={<ResetPassword />} />
                <Route path='/reset' element={<FuncReset />} />
              </Routes>
            </AnimatePresence>
          </CompanyContext>
        </PicksDataContext>
      </div>
    </>
  );
}

export default App;

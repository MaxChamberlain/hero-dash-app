import './App.css';
import './assets/main.css'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Splash from './pages/Splash/Splash';
import Settings from './pages/Settings/Settings';
import User from './pages/User/User';
import { useEffect } from 'react';


function App() {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/') {
      if(JSON.parse(localStorage.getItem('@ViDash:_userInfo')) && JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token) {
        navigate('/home')
      }
    }else{
      if(!(JSON.parse(localStorage.getItem('@ViDash:_userInfo')) || JSON.parse(localStorage.getItem('@ViDash:_userInfo')).token)) {
        navigate('/')
      }
    }
  }, [location.pathname])

  return (
    <>
      {(location.pathname === '/login' || location.pathname === '/' || location.pathname === '/register') || <Header />}
      <div className="App-header flex justify-center items-center font-mono">
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Splash />} />
            <Route path='/home' element={<HomePage /> } />
            <Route path='/login' element={<Login /> } /> 
            <Route path='/register' element={<Register /> } /> 
            <Route path='/settings' element={<Settings /> } />
            <Route path='/user/:id' element={<User /> } />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;

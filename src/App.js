import './App.css';
import './assets/main.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

function App() {

  const location = useLocation();

  return (
    <div className="App-header flex justify-center items-center">
      {/* {(location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register') || <Header />} */}
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route exact path='/home' element={<HomePage /> } />
          <Route exact path='/login' element={<Login /> } /> 
          <Route exact path='/register' element={<Register /> } /> 
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="App-header">
      <Routes>
        <Route path='/' element={<HomePage /> } />
        <Route path='/login' element={<Login /> } />  
      </Routes>
    </div>
  );
}

export default App;

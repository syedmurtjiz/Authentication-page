import { Navigate, Route, Routes, Refresh } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

function App() {

  return (
    <div className="App">
      {/* <RefrshHandler setIsAuthenticated={setIsAuthenticated} /> */}
      <Routes>
        <Route path='/' element={<Navigate to="/signup" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
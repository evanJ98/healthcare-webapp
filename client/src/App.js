//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Patient from './pages/Patient';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import BP_Logo from './img/BP_Logo.png';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='header'>
          <img src={BP_Logo} width="35" height="35" alt="Logo" />
          <NavLink exact activeClassName="active" to="/">Home</NavLink>
          {/* <NavLink activeClassName="active" to="/signup">Sign Up</NavLink>
          <NavLink activeClassName="active" to="/login">Login</NavLink>
          <NavLink activeClassName="active" to="/patient">Patient</NavLink> */}
        </div>

        <div className='content'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/signup' element={<PublicRoute><Signup /></PublicRoute>} />
            <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/patient' element={<PrivateRoute><Patient /></PrivateRoute>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

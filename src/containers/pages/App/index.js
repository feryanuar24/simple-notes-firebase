import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../config/redux/store";
import "./App.css";
import logo from "../../../assets/img/logo/logo.svg";
import Dashboard from "../Dashboard";
import Login from "../Login";
import Register from "../Register";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-expand-lg bg-light">
            <div className="container">
              <Link to="/" className="navbar-brand">
                <img
                  src={logo}
                  alt="ReactJS"
                  width="40"
                  className="d-inline-block align-text-top"
                />
                Notes
              </Link>
              <button className="navbar-toggler" type="button">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                    <Link to="/" className="nav-link active">
                      Dashboard
                    </Link>
                  </li>
                </ul>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { reset } from "../../../store/slices/authSlice";
import "./Navbar.css";

const Navbar = ({ updateCartIsVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((store) => store.auth.isLogged);

  const userTo = isLogged ? "/profile" : "/login";

  const logout = () => {
    dispatch(reset());
    navigate("/login");
  };

  const getclass = ({ isActive }) => {
    if (isActive) return "header_nav_link header_nav_link--active";
    else return "header_nav_link";
  };

  const handleCartClick = () => {
    if (isLogged) updateCartIsVisible();
    else navigate("/login");
  }

  return (
    <header className="header">
      <Link to="/" className="link">
        <div><h1>e-commerce</h1></div>
      </Link>

      <nav>
        <ul className="header_nav_list">
          <li>
            <NavLink to={userTo} className={getclass}>
              <i className="bx bx-user"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/purchases" className={getclass}>
              <i className="bx bx-box"></i>
            </NavLink>
          </li>
          <li>
            <button className="header_nav_btn" onClick={handleCartClick}>
              <i className="bx bx-cart-alt"></i>
            </button>
          </li>
          {isLogged && (
            <li>
              <button onClick={logout} className="header_nav_btn">
                <i className="bx bx-log-out"></i>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
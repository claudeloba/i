import { Link } from "react-router-dom";
import me from "../me.jpg";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <h1 className="navbar__container__logo">Claude Loba</h1>

        <img className="navbar__container__self" src={me} alt="" />
        <Link to="/" className="navbar__container__link">
          Home
        </Link>
        <Link to="/new-name" className="navbar__container__link">
          Add Name
        </Link>
        <Link to="/view-names" className="navbar__container__link">
          View Names
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

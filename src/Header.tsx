import { Link } from "react-router-dom";
import { Link as MuiLink } from "@material-ui/core";

import "./Header.css";

const Header = () => (
  <header className="app-header">
    <h1>Subsolver: a substitution cipher solving game</h1>
    <Link to="/hard">
      <MuiLink>Hard Mode</MuiLink>
    </Link>

    <Link to="/">
      <MuiLink>Classic</MuiLink>
    </Link>
  </header>
);

export default Header;

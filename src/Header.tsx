import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@material-ui/core";

import "./Header.css";

const HeaderLink = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to}>
    <MuiLink>{children}</MuiLink>
  </Link>
);

const Header = () => (
  <header className="app-header">
    <h1>Subsolver: a substitution cipher solving game</h1>
    <HeaderLink to="/hard">Hard Mode</HeaderLink>
    <HeaderLink to="/">Classic</HeaderLink>
  </header>
);

export default Header;

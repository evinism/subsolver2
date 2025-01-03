import "./PageHeader.css";
import { Link } from "react-router-dom";

interface PageHeaderProps {
  headerText: string;
}

const PageHeader = ({ headerText }: PageHeaderProps) => {
  return (
    <header className="page-header">
      <Link to="/" className="back-button">
        ⟨ Back
      </Link>
      <h2>Subsolver: {headerText}</h2>
    </header>
  );
};

export default PageHeader;

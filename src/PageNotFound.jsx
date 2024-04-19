import { Link } from "react-router-dom";
import "./assets/css/PageNotFound.css";

function PageNotFound() {
  return (
    <div className="page-not-found">
      <div>
        <h1>404</h1>
        <p>Page Not Found</p>
        <Link to="/">Go Back Home</Link>
      </div>
    </div>
  );
}

export default PageNotFound;

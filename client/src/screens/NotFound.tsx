import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Alert variant="danger">Page Not Found!</Alert>;
    </>
  );
}

export default NotFound;

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound-wrapper">
      <h1>Page not found</h1>
      <Link to="/">Home</Link>
    </div>
  );
}

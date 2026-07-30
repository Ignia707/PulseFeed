// Loading page template component

import Spinner from "../components/Spinner";
import "./Loading.css";

function Loading({ status }) {
  return (
    <div className="page-container loading-page">
      <Spinner />
      <h2>{status}</h2>
      <p>Bear with us a moment...</p>
    </div>
  );
}

export default Loading;

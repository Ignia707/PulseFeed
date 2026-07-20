// Delete button component

import { deleteImage } from "../api";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./DeleteButton.css";

function DeleteButton({ imageId, onDeleteSuccess }) {
  const { token } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [status, setStatus] = useState(null);

  const deleteImageHandler = async () => {
    try {
      setDeleting(true);
      setStatus(null);

      await deleteImage(imageId, token);
      await onDeleteSuccess(token);
    } catch (err) {
      setStatus({ type: "error", message: "Delete failed. Try again." });
      console.error(err);
      setDeleting(false);
    }
  };

  return (
    <>
      <button
        className="delete-btn"
        onClick={deleteImageHandler}
        disabled={deleting}
        aria-label="Delete image"
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
        </svg>
      </button>

      {deleting && (
        <div className="delete-overlay">
          <div className="spinner" />
        </div>
      )}

      {status && <div className="delete-toast error">{status.message}</div>}
    </>
  );
}

export { DeleteButton };

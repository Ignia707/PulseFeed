// component for deleting a user

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function DeleteUserButton({ userId, username, onDeleteUser, onDeleteSuccess }) {
  const { token } = useAuth();
  const [deleting, setDeleting] = useState(false);

  const handleClick = async () => {
    if (!window.confirm(`Delete user "${username}"? This cannot be undone.`)) {
      return;
    }

    try {
      setDeleting(true);

      await onDeleteUser(userId, token);
      await onDeleteSuccess(token);
    } catch (err) {
      console.error(err);
      setDeleting(false);
    }
  };

  return (
    <button
      className="delete-user-btn"
      onClick={handleClick}
      disabled={deleting}
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}

export default DeleteUserButton;

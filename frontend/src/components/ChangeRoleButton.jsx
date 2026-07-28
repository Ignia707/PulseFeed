// component for Promote and demote button

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function ChangeRoleButton({
  userId,
  onChangeRole,
  actionLabel,
  onChangeSuccess,
}) {
  const { token } = useAuth();
  const [changing, setChanging] = useState(false);
  const [status, setStatus] = useState(null);

  const handleClick = async () => {
    try {
      setChanging(true);
      setStatus(null);

      await onChangeRole(userId, token);
      await onChangeSuccess(token);

      console.log(`User with ${userId} promoted to admin`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button className="role-action-btn" onClick={handleClick}>
      {actionLabel}
    </button>
  );
}

export default ChangeRoleButton;

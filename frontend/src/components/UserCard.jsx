// card component for user card

import { useState } from "react";
import ChangeRoleButton from "./ChangeRoleButton";
import DeleteUserButton from "./DeleteUserButton";
import "./UserCard.css";

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString();
}

function UserCard({
  user,
  canChangeRole,
  onChangeRole,
  onChangeSuccess,
  actionLabel,
  onDeleteUser,
  onDeleteSuccess,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="user-card">
      <div className="user-card-main">
        <div className="user-info">
          <p className="user-name">{user.username}</p>
          <span className={`role-badge role-${user.role}`}>{user.role}</span>
        </div>
        <div className="user-card-actions">
          {canChangeRole(user) && (
            <ChangeRoleButton
              userId={user._id}
              onChangeRole={onChangeRole}
              onChangeSuccess={onChangeSuccess}
              actionLabel={actionLabel}
            />
          )}
          {onDeleteUser && (
            <DeleteUserButton
              userId={user._id}
              username={user.username}
              onDeleteUser={onDeleteUser}
              onDeleteSuccess={onDeleteSuccess}
            />
          )}
          <button
            className="expand-toggle-btn"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
          >
            {expanded ? "Hide details" : "Show details"}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="user-card-details">
          <p>
            <span className="detail-label">Email:</span> {user.email}
          </p>
          <p>
            <span className="detail-label">Joined:</span>{" "}
            {formatDate(user.createdAt)}
          </p>
          <p>
            <span className="detail-label">Last updated:</span>{" "}
            {formatDate(user.updatedAt)}
          </p>
        </div>
      )}
    </div>
  );
}

export default UserCard;

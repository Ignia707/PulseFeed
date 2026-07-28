// component for displaying fetched users

import UserCard from "./UserCard";
import Spinner from "./Spinner";

function Userlist({
  users,
  canChangeRole = () => true, // default: always show the action (admin dashboard's case)
  onChangeRole,
  onChangeSuccess,
  actionLabel,
  onDeleteUser,
  onDeleteSuccess,
  isLoading,
  error,
}) {
  return error ? (
    <p>{error.message || "Something went wrong."}</p>
  ) : isLoading ? (
    <Spinner />
  ) : users.length === 0 ? (
    <p>No users found.</p>
  ) : (
    <div className="user-list">
      {users.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          canChangeRole={canChangeRole}
          onChangeRole={onChangeRole}
          onChangeSuccess={onChangeSuccess}
          actionLabel={actionLabel}
          onDeleteUser={onDeleteUser}
          onDeleteSuccess={onDeleteSuccess}
        />
      ))}
    </div>
  );
}

export default Userlist;

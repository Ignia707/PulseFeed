// super-admin dashboard

import { useState } from "react";
import { fetchUsersAdmins, demoteUser, deleteUserAdmin } from "../api";
import Userlist from "../components/UserList";
import Toast from "../components/Toast";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetchList";

function SuperAdminDashboard() {
  const { token } = useAuth();
  const [toastMessage, setToastMessage] = useState(null);

  const {
    items: users,
    isLoading,
    error,
    fetchHelper: refetchUsers,
  } = useFetch(fetchUsersAdmins, token);

  // only admins in this list can be demoted — plain users pass through untouched
  const canChangeRole = (user) => user.role === "admin";
  const onChangeRole = (userId) => demoteUser(userId, token);
  const actionLabel = "Demote";

  const onChangeSuccess = async (token) => {
    await refetchUsers(token);
    setToastMessage("Admin demoted to user");
  };

  const onDeleteSuccess = async (token) => {
    await refetchUsers(token);
    setToastMessage("User deleted");
  };

  return (
    <div className="page-container">
      <h1>Superadmin Dashboard</h1>
      <Userlist
        users={users}
        canChangeRole={canChangeRole}
        onChangeRole={onChangeRole}
        onChangeSuccess={onChangeSuccess}
        actionLabel={actionLabel}
        onDeleteUser={deleteUserAdmin}
        onDeleteSuccess={onDeleteSuccess}
        isLoading={isLoading}
        error={error}
      />
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
        variant="error"
      />
    </div>
  );
}

export default SuperAdminDashboard;

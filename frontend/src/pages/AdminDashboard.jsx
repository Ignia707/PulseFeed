import { useState } from "react";
import { fetchUsers, promoteUser, deleteUser } from "../api";
import Userlist from "../components/UserList";
import Toast from "../components/Toast";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetchList";

function AdminDashboard() {
  const { token } = useAuth();
  const [toastMessage, setToastMessage] = useState(null);

  const {
    items: users,
    isLoading,
    error,
    fetchHelper: refetchUsers,
  } = useFetch(fetchUsers, token);

  // methods passed to handle promote logic and conditional render
  const onChangeRole = (userId) => promoteUser(userId, token);
  const actionLabel = "Promote";

  const onChangeSuccess = async (token) => {
    await refetchUsers(token);
    setToastMessage("User promoted to admin");
  };

  const onDeleteSuccess = async (token) => {
    await refetchUsers(token);
    setToastMessage("User deleted");
  };

  return (
    <div className="page-container">
      <h1>Admin-Dashboard</h1>
      <Userlist
        users={users}
        onChangeRole={onChangeRole}
        onChangeSuccess={onChangeSuccess}
        actionLabel={actionLabel}
        onDeleteUser={deleteUser}
        onDeleteSuccess={onDeleteSuccess}
        isLoading={isLoading}
        error={error}
      />
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

export default AdminDashboard;

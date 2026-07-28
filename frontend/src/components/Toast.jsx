// small auto-dismissing popup message

import { useEffect } from "react";
import "./Toast.css";

function Toast({ message, onClose, duration = 2500, variant = "success" }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast-${variant}`}>
      <p>{message}</p>
    </div>
  );
}

export default Toast;

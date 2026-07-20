// Upload image component

import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { uploadImage } from "../api";
import "./UploadForm.css";

function UploadForm({ onUploadSuccess }) {
  const { token } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }
  const fileInputRef = useRef(null);

  // auto-dismiss the status popup after a few seconds
  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(null), 3000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0] || null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const uploadImageHelper = async (token) => {
      try {
        setUploading(true);
        setStatus(null);

        await uploadImage(token, selectedFile);
        await onUploadSuccess(token);

        setStatus({ type: "success", message: "Image uploaded!" });

        // clear the selection so the button disappears and the
        // native file input resets (inputs can't be cleared via state alone)
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";

        console.log("Image uploaded");
      } catch (err) {
        setStatus({ type: "error", message: "Upload failed. Try again." });
        console.error(err);
      } finally {
        setUploading(false);
      }
    };
    uploadImageHelper(token);
  };

  return (
    <div className="upload-form">
      <form onSubmit={handleSubmit}>
        <label className="file-label">
          {selectedFile ? selectedFile.name : "Choose Image"}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </label>

        {selectedFile && (
          <button type="submit" className="upload-btn" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
        )}
      </form>

      {status && (
        <div className={`upload-toast ${status.type}`}>{status.message}</div>
      )}
    </div>
  );
}

export { UploadForm };

// Image display component for Home and Gallery

import { useAuth } from "../context/AuthContext";
import "../pages/ImagePanel.css";
import { DeleteButton } from "./DeleteButton";

function ImageGrid({ images, isLoading, error, onDeleteSuccess }) {
  const { user } = useAuth();
  return (
    <div className="image-container">
      {error ? (
        <p className="message error">Error loading images.</p>
      ) : isLoading ? (
        <p className="message">Loading...</p>
      ) : images?.length ? (
        <div className="image-grid">
          {images.map((image) => (
            <div key={image.publicId} className="image-card">
              <img src={image.url} alt="Uploaded" className="image" />
              {user.role === "admin" && (
                <DeleteButton
                  imageId={image._id}
                  onDeleteSuccess={onDeleteSuccess}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="message">No images found.</p>
      )}
    </div>
  );
}

export { ImageGrid };

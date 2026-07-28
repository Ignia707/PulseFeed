// Images panel

import { fetchImages } from "../api";
import { ImageGrid } from "../components/ImageGrid";
import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetchList";
import "./ImagePanel.css";

function Gallery() {
  const { token } = useAuth();

  const {
    items: images,
    isLoading,
    error,
    fetchHelper: refetchImages,
  } = useFetch(fetchImages, token);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gallery</h1>
      </div>
      <ImageGrid
        images={images}
        isLoading={isLoading}
        error={error}
        onDeleteSuccess={refetchImages}
      />
    </div>
  );
}

export default Gallery;

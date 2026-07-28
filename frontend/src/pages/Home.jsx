// Home component

import { fetchMyImages } from "../api";
import { useAuth } from "../context/AuthContext";
import { ImageGrid } from "../components/ImageGrid";
import { useFetch } from "../hooks/useFetchList";
import "./ImagePanel.css";
import { UploadForm } from "../components/UploadForm";

function Home() {
  const { token } = useAuth();

  const {
    items: images,
    isLoading,
    error,
    fetchHelper: refetchImages,
  } = useFetch(fetchMyImages, token);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Images</h1>
        <UploadForm onUploadSuccess={refetchImages} />
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

export default Home;

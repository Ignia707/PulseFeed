// Home component

import { fetchMyImages } from "../api";
import { useAuth } from "../context/AuthContext";
import { ImageGrid } from "../components/ImageGrid";
import { useImages } from "../hooks/useImages";
import "./ImagePanel.css"
import { UploadForm } from "../components/UploadForm";


function Home() {
    const { token } =  useAuth();
    
    const { images, isLoading, error } = useImages(fetchMyImages, token);

  return (
        <div className="page-container">
        <div>
          <h1>My Images</h1>
          <UploadForm onUploadSuccess={fetchMyImages}/>
        </div>
        <ImageGrid 
            images={images}
            isLoading={isLoading}
            error={error}
        />
        </div>
  );
}

export default Home;
// Images panel


import { fetchImages } from "../api";
import { ImageGrid } from "../components/ImageGrid";
import { useAuth } from "../context/AuthContext";
import { useImages } from "../hooks/useImages";
import "./ImagePanel.css"

function Gallery() {
    const { token } =  useAuth();
    
    const { images, isLoading, error } = useImages(fetchImages, token);

    return (
        <div className="page-container">
        <h1>Gallery</h1>
        <ImageGrid 
            images={images}
            isLoading={isLoading}
            error={error}
        />
        </div>
    );
}

export default Gallery;
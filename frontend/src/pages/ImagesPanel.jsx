// Images panel


import { useEffect, useState } from "react";
import { fetchImages } from "../api";
import "./ImagePanel.css"
import { useAuth } from "../context/AuthContext";

function ImagesPanel() {
    const { token } =  useAuth();
    const [ images, setImages ] = useState([]);
    const [ isloading, setIsLoading ] = useState(true); // therer's atleast one render where data doesn't arrive
    const [ error, setError ] = useState(null);

    // fetch images on mount
    useEffect(() => {
        const fetchImagesHelper =  async(token) => {
            try {
                setIsLoading(true);
                const imagesData = await fetchImages(token);
                setImages(imagesData.data);
                console.log('Images fetched successfully');

            } catch(err) {
                setError(err);
                console.error(err);
                
            } finally {
                setIsLoading(false);

            }
        }
        fetchImagesHelper(token);

    }, []);

    return (
        <div className="page-container">
        <h1>Image panel</h1>
        <div className="image-container">
        {error ? (
            <p className="message error">Error loading images.</p>
        ) : isloading ? (
            <p className="message">Loading...</p>
        ) : images?.length ? (
            <div className="image-grid">
            {images.map((image) => (
                <div key={image.publicId} className="image-card">
                <img
                    src={image.url}
                    alt="Uploaded"
                    className="image"
                />
                </div>
            ))}
            </div>
        ) : (
            <p className="message">No images found.</p>
        )}
        </div>
        </div>
    );
}

export default ImagesPanel;
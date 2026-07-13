// Image display component for Home and Gallery

import "../pages/ImagePanel.css"

function ImageGrid({ images, isLoading, error }) {
    return(
        <div className="image-container">
        {error ? (
            <p className="message error">Error loading images.</p>
        ) : isLoading ? (
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
    );
}

export { ImageGrid };
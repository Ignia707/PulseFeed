// Upload image component


import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { uploadImage } from "../api";

function UploadForm({ onUploadSuccess }) {
    const { token } = useAuth();
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    // select file event handler
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!selectedFile) {
            throw Error('No image selected! Please select an image');
        }

        const uploadImageHelper = async(token) => {
            try {
                setUploading(true);
                await uploadImage(token, selectedFile);
                await onUploadSuccess();
                console.log('Image Uploaded successfully');
                
            } catch(err) {
                setError(err);
                console.error(err);

            } finally {
                setUploading(false);

            }
        }
        uploadImageHelper(token);
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button type="submit" disabled={uploading}>
                Upload
            </button>
        </form>
        {error && <p>Error uploading image</p>}
        </>
    );


}

export { UploadForm };
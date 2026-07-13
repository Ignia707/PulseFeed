// custom hook to enable fetching images

import { useState, useEffect } from "react";

function useImages(fetchFn, token) {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // therer's atleast one render where data doesn't arrive
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImageHelper = async(token) => {
            try {
                const imagesData = await fetchFn(token);
                setImages(imagesData.data);
                console.log('Images fetched sucessfully');

            } catch(err) {
                setError(err);
                console.error(err);
            
            } finally {
                setIsLoading(false);
            }
        }
        fetchImageHelper(token);
    }, []);

    return { images, isLoading, error };
}

export { useImages };
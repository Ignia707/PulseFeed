// Connect frontend to backend


// helper function 
const fetchAPI = async(data,endPoint, token="") => {
    try {
        // if token exists / user logged in - add token to the headers 
        if(token) {
            data.headers.authorization = `Bearer ${token}`;
        }
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}${endPoint}`, data);
        
        const result = await response.json();
        if(!response.ok) {
            throw new Error(result.message || 'Something went wrong :")');
        }

        return result;

    } catch(err) {
        console.error('ERROR: ', err);
        throw err;

    }
}


const registerUser = async(data) => {
    const fetchOptionData = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    };
    

    return await fetchAPI(fetchOptionData, '/auth/register');
}

const loginUser = async(data) => {
    const fetchOptionData = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    };

    return await fetchAPI(fetchOptionData, '/auth/login');
}

// to fetch images - the user just needs to have a valid token
const fetchImages = async(token) => {
    const fetchOptionData = {
        method : 'GET',
        headers : {},
    }

    return await fetchAPI(fetchOptionData, '/image/get', token);
}

export {
    registerUser, 
    loginUser,
    fetchImages
};
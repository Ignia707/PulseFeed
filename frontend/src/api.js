// Connect frontend to backend


// helper function 
const fetchAPI = async(data,endPoint) => {
    try {
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

export {
    registerUser, 
    loginUser
};
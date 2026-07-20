// Connect frontend to backend

// helper function
const fetchAPI = async (data, endPoint, token = "") => {
  try {
    // if token exists / user logged in - add token to the headers
    if (token) {
      data.headers.authorization = `Bearer ${token}`;
    }
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}${endPoint}`,
      data,
    );

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong :")');
    }

    return result;
  } catch (err) {
    console.error("ERROR: ", err);
    throw err;
  }
};

const registerUser = async (data) => {
  const fetchOptionData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return await fetchAPI(fetchOptionData, "/auth/register");
};

const loginUser = async (data) => {
  const fetchOptionData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return await fetchAPI(fetchOptionData, "/auth/login");
};

// to fetch images - the user just needs to have a valid token
const fetchImages = async (token) => {
  const fetchOptionData = {
    method: "GET",
    headers: {},
    query: {
      all: true,
    },
  };

  return await fetchAPI(fetchOptionData, "/image/get?all=true", token);
};
const fetchMyImages = async (token) => {
  const fetchOptionData = {
    method: "GET",
    headers: {},
    query: {
      all: true,
    },
  };

  return await fetchAPI(fetchOptionData, "/image/get", token);
};

const uploadImage = async (token, imageFile) => {
  // build the formData object to upload
  const formData = new FormData();
  formData.append("image", imageFile);

  const fetchOptionData = {
    method: "POST",
    // no headers - browser handles Content-Type itself
    headers: {},
    body: formData,
  };

  return await fetchAPI(fetchOptionData, "/image/upload", token);
};

const deleteImage = async (imageId, token) => {
  const fetchOptionData = {
    method: "DELETE",
    headers: {},
  };

  return fetchAPI(fetchOptionData, `/image/${imageId}`, token);
};

export {
  registerUser,
  loginUser,
  fetchImages,
  fetchMyImages,
  uploadImage,
  deleteImage,
};

// custom hook to enable fetching data

import { useState, useEffect } from "react";

function useFetch(fetchFn, token) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // therer's atleast one render where data doesn't arrive
  const [error, setError] = useState(null);

  // define it outside to return
  const fetchHelper = async (token, showLoading = true) => {
    try {
      if (showLoading) setIsLoading(true);
      const itemsData = await fetchFn(token);
      setItems(itemsData.data);
      console.log("Items fetched sucessfully");
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchHelper(token, false);
  }, []);

  return { items, isLoading, error, fetchHelper };
}

export { useFetch };

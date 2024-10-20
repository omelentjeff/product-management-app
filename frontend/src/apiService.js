import axios from "axios";
import authService from "./authService";

const baseUrl = import.meta.env.VITE_API_URL;

export const fetchData = async (page = 0, pageSize = 10, sort = "ASC") => {
  const token = authService.getCurrentUser();
  try {
    console.log("Token:", token);
    console.log("API Base URL:", baseUrl);

    const response = await axios.get(
      `${baseUrl}?page=${page}&size=${pageSize}&sort=${sort}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Data fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    throw (
      error.response?.data ||
      new Error("An error occurred while fetching data.")
    );
  }
};

export const fetchAllData = async () => {
  let allData = [];
  let page = 0;
  let pageSize = 10;
  let totalPages = 1;

  while (page < totalPages) {
    try {
      const response = await fetchData(page, pageSize);
      allData = [...allData, ...response.content];
      totalPages = response.totalPages;
      page++;
    } catch (error) {
      console.error(`Error fetching data:`, error);
      throw error;
    }
  }

  return allData;
};

export const fetchSingleData = async (id) => {
  const token = authService.getCurrentUser();
  try {
    const response = await axios.get(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    throw (
      error.response?.data ||
      new Error("An error occurred while fetching single data.")
    );
  }
};

export const fetchSearchData = async (query) => {
  const token = authService.getCurrentUser();
  console.log("Searching for: ", query);
  try {
    const response = await axios.get(`${baseUrl}/search?name=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Check for 204 No Content
    if (response.status === 204) {
      return { content: [], totalPages: 0 };
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching search data:`, error);
    throw (
      error.response?.data ||
      new Error("An error occurred while searching data.")
    );
  }
};

export const updateProduct = async (product) => {
  const token = authService.getCurrentUser();
  try {
    const response = await axios.patch(`${baseUrl}/${product.id}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(`Error updating product:`, error);
    throw (
      error.response?.data ||
      new Error("An error occurred while updating product.")
    );
  }
};

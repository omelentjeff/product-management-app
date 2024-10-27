import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/products`;

/**
 * Fetches paginated data from the products API.
 *
 * @param {string} token - The JWT token for authorization.
 * @param {number} [page=0] - The page number to fetch (default is 0).
 * @param {number} [pageSize=10] - The number of items per page (default is 10).
 * @param {string} [sort="ASC"] - The sort order (default is ascending).
 * @returns {Promise<Object>} The response data containing the fetched products.
 * @throws {Error} Throws an error if the data fetching fails.
 */
export const fetchData = async (
  token,
  page = 0,
  pageSize = 10,
  sort = "ASC"
) => {
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

/**
 * Fetches all products by paginating through API calls.
 *
 * @returns {Promise<Array>} An array containing all fetched product data.
 * @throws {Error} Throws an error if data fetching fails at any page.
 */
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

/**
 * Fetches a single product by its ID.
 *
 * @param {string} token - The JWT token for authorization.
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Object>} The response data containing the product details.
 * @throws {Error} Throws an error if fetching the product fails.
 */
export const fetchSingleData = async (token, id) => {
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

/**
 * Searches for products based on a query string.
 *
 * @param {string} token - The JWT token for authorization.
 * @param {string} query - The search query.
 * @returns {Promise<Object>} The response data containing the search results.
 * @throws {Error} Throws an error if the search fails.
 */
export const fetchSearchData = async (token, query) => {
  console.log("Searching for: ", query);
  try {
    const response = await axios.get(`${baseUrl}/search?query=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Check for 204 No Content
    if (response.status === 204) {
      return { content: [], totalPages: 0 };
    }

    console.log("JOU: ", response);
    return response.data;
  } catch (error) {
    console.error(`Error fetching search data:`, error);
    throw (
      error.response?.data ||
      new Error("An error occurred while searching data.")
    );
  }
};

/**
 * Saves product details.
 *
 * @param {string} token - The JWT token for authorization.
 * @param {Object} formData - The product details to save.
 * @returns {Promise<Object>} The response from the API.
 * @throws {Error} Throws an error if saving the product fails.
 */
export const saveProductDetails = async (token, formData) => {
  console.log("SAVE TOKEN: " + token);
  try {
    const response = await axios.post(baseUrl, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error saving product details:", error);
    throw error;
  }
};

/**
 * Updates product details by ID.
 *
 * @param {string} token - The JWT token for authorization.
 * @param {string} id - The ID of the product to update.
 * @param {Object} product - The product details to update.
 * @returns {Promise<Object>} The response from the API.
 * @throws {Error} Throws an error if updating the product fails.
 */
export const updateProductDetails = async (token, id, product) => {
  try {
    const response = await axios.patch(`${baseUrl}/${id}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // product details content type
      },
    });
    return response;
  } catch (error) {
    console.error(`Error updating product details:`, error);
    throw error;
  }
};

/**
 * Uploads a product image by ID.
 *
 * @param {string} token - The JWT token for authorization.
 * @param {string} id - The ID of the product to update.
 * @param {Object} formData - The form data containing the image.
 * @returns {Promise<Object>} The response from the API.
 * @throws {Error} Throws an error if uploading the image fails.
 */
export const uploadProductImage = async (token, id, formData) => {
  try {
    const response = await axios.patch(`${baseUrl}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // image content type
      },
    });
    return response;
  } catch (error) {
    console.error(`Error uploading product image:`, error);
    throw error;
  }
};

/**
 * Deletes a product by ID.
 *
 * @param {string} token - The JWT token for authorization.
 * @param {string} id - The ID of the product to delete.
 * @returns {Promise<Object>} The response from the API.
 * @throws {Error} Throws an error if deleting the product fails.
 */
export const deleteProduct = async (token, id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(`Error deleting product:`, error);
    throw error;
  }
};

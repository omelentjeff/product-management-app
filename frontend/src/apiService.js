const baseUrl = import.meta.env.VITE_API_URL;

export const fetchData = async (page = 0, pageSize = 10, sort = "") => {
  try {
    console.log("API Base URL:", baseUrl);
    const response = await fetch(
      `${baseUrl}?page=${page}&size=${pageSize}&sort=${sort}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    throw error;
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
  try {
    const response = await fetch(`${baseUrl}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    throw error;
  }
};

export const fetchSearchData = async (query) => {
  console.log("Searching for: ", query);
  try {
    const response = await fetch(`${baseUrl}/search?name=${query}`);

    // Check for 204 No Content
    if (response.status === 204) {
      // Return empty content and no pages if the result is empty
      return { content: [], totalPages: 0 };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data:`, error);
    throw error;
  }
};

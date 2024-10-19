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

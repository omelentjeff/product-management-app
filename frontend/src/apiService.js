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

export const getComments = async () => {
  const url = "https://dummyjson.com/comments";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json?.comments;
  } catch (error) {
    console.error(error.message);
  }
};

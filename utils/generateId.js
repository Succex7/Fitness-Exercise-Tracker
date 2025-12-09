const generateId = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    return 1; // Start IDs at 1 if array is empty or not valid
  }

  /* Extracts all current IDs */
  const ids = array.map(item => item.id);

  /* Find the maximum ID */
  const maxId = Math.max(...ids);

  /* Returns the next available ID */
  return maxId + 1;
};

export default generateId;
const RemoveStorage = ({ key }: { key: string }) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

export default RemoveStorage;

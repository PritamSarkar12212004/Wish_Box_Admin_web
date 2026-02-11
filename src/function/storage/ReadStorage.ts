import { decryptData } from "../../services/crypto/Crypto";

const ReadStorage = ({ key }: { key: string }) => {
  try {
    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) return null;

    return decryptData(encryptedData);
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
};

export default ReadStorage;

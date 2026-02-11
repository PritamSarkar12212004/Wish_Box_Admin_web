import { encryptData } from "../../services/crypto/Crypto";

const WriteStorage = ({ key, value }: { key: string; value: any }) => {
  try {
    const encryptedData = encryptData(value);
    localStorage.setItem(key, encryptedData);
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
};

export default WriteStorage;

import SecureToken from "../../consts/token/SecureToken";
import CryptoJS from "crypto-js";

const secretKey = SecureToken.CRYPTO_TOKEN_SECURE_KEY;

const encryptData = (data: any): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

const decryptData = (encryptedData: string): any => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};

export { encryptData, decryptData };

import axios from "axios";
import CloudinaryToken from "../../consts/token/services/CloudinaryToken";
import ValidateFile from "./helper/ValidateFile";
import ImgConvator from "./helper/ImgConvator";
import { UploadWithProgressArgs } from "./helper/UploadWithProgressArgs";

const normalizeFile = (input: File | string): File => {
  if (typeof input === "string") {
    return ImgConvator(input);
  }
  return input;
};

const uploadToCloudinary = async ({
  file,
  count,
  onProgress,
}: UploadWithProgressArgs) => {
  const uploadSingle = async (input: File | string) => {
    const singleFile = normalizeFile(input);

    ValidateFile(singleFile, count);

    const formData = new FormData();
    formData.append("file", singleFile);
    formData.append(
      "upload_preset",
      CloudinaryToken.CLOUDANERY_PRESET.UPLOAD_PRESET,
    );
    formData.append("folder", "wishbox");

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CloudinaryToken.CLOUDANERY_PRESET.CLOUDE_NAME}/image/upload`,
      formData,
      {
        onUploadProgress: (e) => {
          if (!e.total || !onProgress) return;
          const percent = Math.round((e.loaded * 100) / e.total);
          onProgress(percent);
        },
      },
    );

    return res.data;
  };

  // ✅ SINGLE
  if (count === "single") {
    return uploadSingle(file);
  }

  // ✅ MULTIPLE
  return Promise.all(file.map(uploadSingle));
};

export default uploadToCloudinary;

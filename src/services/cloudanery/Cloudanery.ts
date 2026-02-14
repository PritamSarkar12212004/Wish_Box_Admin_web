import axios from "axios";
import CloudinaryToken from "../../consts/token/services/CloudinaryToken";
import ValidateFile from "./helper/ValidateFile";
import { UploadWithProgressArgs } from "./helper/UploadWithProgressArgs";

const uploadToCloudinary = async ({
  file,
  count,
  onProgress,
}: UploadWithProgressArgs) => {
  const uploadSingle = async (singleFile: File) => {
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
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total || !onProgress) return;
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );

          onProgress(percent);
        },
      },
    );

    return res.data;
  };

  if (count === "single") {
    return await uploadSingle(file);
  }
  return await Promise.all(file.map(uploadSingle));
};

export default uploadToCloudinary;

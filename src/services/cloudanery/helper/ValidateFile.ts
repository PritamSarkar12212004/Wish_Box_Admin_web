const ValidateFile = (file: File, count: "single" | "multiple") => {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files allowed");
  }
};

export default ValidateFile;

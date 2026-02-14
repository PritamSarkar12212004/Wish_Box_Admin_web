const ValidateFile = (file: File, count: "single" | "multiple") => {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only Image Formate Allowed");
  }

  if (count === "multiple" && !file.name.endsWith(".amp")) {
    throw new Error("Multiple Image Upload Support .amp collection Images");
  }
};
export default ValidateFile;

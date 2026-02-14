export type UploadArgs =
  | {
      count: "single";
      file: File;
    }
  | {
      count: "multiple";
      file: File[];
    };

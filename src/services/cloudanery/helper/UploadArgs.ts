export type UploadArgs =
  | {
      count: "single";
      file: File | string;
    }
  | {
      count: "multiple";
      file: (File | string)[];
    };

import { UploadArgs } from "./UploadArgs";
export type UploadWithProgressArgs = UploadArgs & {
  onProgress?: (percent: number) => void;
};

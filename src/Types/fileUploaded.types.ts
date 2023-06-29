export type FileUploaded = {
  id?: string;
  path?: string;
  preview?: any;
  lastModifiedDate?: string;
  name?: string;
  type?: string;
  size?: number;
  file?: any;
  readableSize?: any;
  url?: string | null;
  progress?: number;
  isUploaded?: boolean;
  itsError?: boolean;
};

export interface MyFile extends File{
  preview:string
}
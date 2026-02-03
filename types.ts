
export interface ProductInfo {
  productName: string;
  region: string;
  features: string;
  target: string;
  tone: string;
}

export interface GeneratedCopy {
  headline: string;
  body: string;
  hashtags: string[];
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

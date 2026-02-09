export interface ProductInfo {
  userName: string;
  productName: string;
  region: string;
  features: string;
  producerStory: string; 
  season: string;        
  target: string;
  tone: string;
  outputFormat: 'SNS' | 'BLOG'; 
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

export interface OptionsReview {
  title: string;
  description: string;
  tags: string[];
  images?: string[];
  badge: string;
}

export interface OptionsReviewUpdate {
  title?: string;
  description?: string;
  tags?: string[];
  images?: string[];
  badge?: string;
}

export interface Review extends OptionsReview {
  id: string;
}

export interface ReviewPagination {
  offset: string;
  limit: number;
}

export interface ReviewFirebase {
  id: string;
  data: any;
}

export type SecurityKeys =
  | "images"
  | "badge"
  | "description"
  | "tags"
  | "title";

export const reviewObject: Record<SecurityKeys, string> = {
  images: "object",
  description: "string",
  title: "string",
  tags: "object",
  badge: "string",
};

export interface DefaultResponse {
  ok: boolean;
  message: string;
}

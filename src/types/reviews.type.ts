export interface OptionsReview {
  title: string;
  description: string;
  tags: string[];
  image: string[];
  badge: string;
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

export type SecurityKeys = "image" | "badge" | "description" | "tags" | "title";

interface Value {
  image: string[];
}

export const reviewObject: Record<SecurityKeys, string> = {
  image: "object",
  description: "string",
  title: "string",
  tags: "object",
  badge: "string",
};

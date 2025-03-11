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

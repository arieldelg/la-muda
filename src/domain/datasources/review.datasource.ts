import { WriteResult } from "firebase-admin/firestore";
import { OptionsReview, ReviewPagination } from "../../types/reviews.type";
import { ReviewEntity } from "../entities/review.entity";

export abstract class ReviewsDatasource {
  abstract addReview(review: OptionsReview): Promise<WriteResult>;
  abstract getReviews(
    paginationReview: ReviewPagination
  ): Promise<{ total: number; reviews: ReviewEntity[] }>;
  abstract getReview(id: string): Promise<ReviewEntity>;
  abstract updateReview(id: string, reviewUpdate: any): Promise<WriteResult>;
}

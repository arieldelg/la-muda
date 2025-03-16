import {
  DefaultResponse,
  OptionsReview,
  ReviewPagination,
} from "../../types/reviews.type";
import { ReviewEntity } from "../entities/review.entity";

export abstract class ReviewsDatasource {
  abstract addReview(
    review: OptionsReview
  ): Promise<{ ok: boolean; data: ReviewEntity }>;
  abstract getReviews(
    paginationReview: ReviewPagination
  ): Promise<{ total: number; reviews: ReviewEntity[] }>;
  abstract getReview(id: string): Promise<ReviewEntity>;
  abstract updateReview(
    id: string,
    reviewUpdate: any
  ): Promise<DefaultResponse>;
}

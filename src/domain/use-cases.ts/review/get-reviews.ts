import { ReviewPagination } from "../../../types/reviews.type";
import { ReviewEntity } from "../../entities/review.entity";
import { ReviewsRepository } from "../../repositories/review.repository";

interface GetReviewsImp {
  execute(
    paginationReview: ReviewPagination
  ): Promise<{ total: number; reviews: ReviewEntity[] }>;
}

export class GetReviews implements GetReviewsImp {
  constructor(private readonly reviewRepository: ReviewsRepository) {}
  execute(
    paginationReview: ReviewPagination
  ): Promise<{ total: number; reviews: ReviewEntity[] }> {
    return this.reviewRepository.getReviews(paginationReview);
  }
}

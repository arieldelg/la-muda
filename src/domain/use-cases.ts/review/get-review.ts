import { ReviewPagination } from "../../../types/reviews.type";
import { ReviewEntity } from "../../entities/review.entity";
import { ReviewsRepository } from "../../repositories/review.repository";

interface GetReviewImp {
  execute(
    paginationReview: ReviewPagination
  ): Promise<{ total: number; reviews: ReviewEntity[] }>;
}

export class GetReview implements GetReviewImp {
  constructor(private readonly reviewRepository: ReviewsRepository) {}
  execute(
    paginationReview: ReviewPagination
  ): Promise<{ total: number; reviews: ReviewEntity[] }> {
    return this.reviewRepository.getReviews(paginationReview);
  }
}

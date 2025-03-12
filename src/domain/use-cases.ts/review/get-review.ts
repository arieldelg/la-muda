import { ReviewEntity } from "../../entities/review.entity";
import { ReviewsRepository } from "../../repositories/review.repository";

interface GetReviewImp {
  execute(id: string): Promise<ReviewEntity>;
}

export class GetReview implements GetReviewImp {
  constructor(private readonly reviewRepository: ReviewsRepository) {}
  execute(id: string): Promise<ReviewEntity> {
    return this.reviewRepository.getReview(id);
  }
}

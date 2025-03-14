import { OptionsReview } from "../../../types/reviews.type";
import { ReviewsRepository } from "../../repositories/review.repository";
import { ReviewEntity } from "../../entities/review.entity";

interface AddReviewImp {
  execute(review: OptionsReview): Promise<{ ok: boolean; data: ReviewEntity }>;
}

export class AddReview implements AddReviewImp {
  constructor(private readonly reviewRepository: ReviewsRepository) {}
  execute(review: OptionsReview): Promise<{ ok: boolean; data: ReviewEntity }> {
    return this.reviewRepository.addReview(review);
  }
}

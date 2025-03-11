import { OptionsReview } from "../../../types/reviews.type";
import { WriteResult } from "firebase-admin/firestore";
import { ReviewsRepository } from "../../repositories/review.repository";

interface AddReviewImp {
  execute(review: OptionsReview): Promise<WriteResult>;
}

export class AddReview implements AddReviewImp {
  constructor(private readonly reviewRepository: ReviewsRepository) {}
  execute(review: OptionsReview): Promise<WriteResult> {
    return this.reviewRepository.addReview(review);
  }
}

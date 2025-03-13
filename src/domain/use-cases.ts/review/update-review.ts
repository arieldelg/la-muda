import { WriteResult } from "firebase-admin/firestore";
import { ReviewsRepository } from "../../repositories/review.repository";

interface UpdateReviewImp {
  execute(id: string, reviewUpdate: any): Promise<WriteResult>;
}

export class UpdateReview implements UpdateReviewImp {
  constructor(private readonly reviewRepository: ReviewsRepository) {}
  execute(id: string, reviewUpdate: any): Promise<WriteResult> {
    return this.reviewRepository.updateReview(id, reviewUpdate);
  }
}

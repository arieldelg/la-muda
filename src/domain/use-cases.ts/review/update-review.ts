import { ReviewsRepository } from "../../repositories/review.repository";
import { DefaultResponse } from "../../../types/reviews.type";

interface UpdateReviewImp {
  execute(id: string, reviewUpdate: any): Promise<DefaultResponse>;
}

export class UpdateReview implements UpdateReviewImp {
  constructor(private readonly reviewRepository: ReviewsRepository) {}
  execute(id: string, reviewUpdate: any): Promise<DefaultResponse> {
    return this.reviewRepository.updateReview(id, reviewUpdate);
  }
}

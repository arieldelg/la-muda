import { WriteResult } from "../../config/firebase";
import {
  ReviewEntity,
  ReviewsDatasource,
  ReviewsRepository,
} from "../../domain";
import { OptionsReview, ReviewPagination } from "../../types/reviews.type";

export class ReviewsRepositoryImp implements ReviewsRepository {
  constructor(private readonly reviewDatasource: ReviewsDatasource) {}

  async addReview(review: OptionsReview): Promise<WriteResult> {
    return this.reviewDatasource.addReview(review);
  }
  async getReviews(
    paginationReview: ReviewPagination
  ): Promise<{ total: number; reviews: ReviewEntity[] }> {
    return this.reviewDatasource.getReviews(paginationReview);
  }
  async getReview(id: string): Promise<ReviewEntity> {
    return this.reviewDatasource.getReview(id);
  }

  updateReview(id: string, reviewUpdate: any): Promise<WriteResult> {
    return this.reviewDatasource.updateReview(id, reviewUpdate);
  }
}

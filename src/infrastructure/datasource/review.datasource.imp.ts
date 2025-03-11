import { db, WriteResult } from "../../config/firebase";
import { ReviewEntity, ReviewsDatasource } from "../../domain";
import { OptionsReview, ReviewPagination } from "../../types/reviews.type";

export class ReviewDatasourceImp implements ReviewsDatasource {
  addReview(review: OptionsReview): Promise<WriteResult> {
    try {
      const document = db.collection("review").doc();
      return document.set({
        ...review,
        id: document.id,
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async getReviews(
    paginationReview: ReviewPagination
  ): Promise<{ total: number; reviews: ReviewEntity[] }> {
    try {
      const total = (await db.collection("review").get()).size;

      const next = await db
        .collection("review")
        .orderBy("id", "asc")
        .startAt(paginationReview.offset)
        .limit(+paginationReview.limit)
        .get();

      const reviews = next.docs.map((doc) =>
        ReviewEntity.fromFirebaseToClient({
          data: doc.data(),
          id: doc.id,
        })
      );
      return {
        total,
        reviews,
      };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

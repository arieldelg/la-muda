import { db, WriteResult } from "../../config/firebase";
import { ReviewEntity, ReviewsDatasource } from "../../domain";
import { CustomErrors } from "../../domain/errors/custom.errors";
import { OptionsReview, ReviewPagination } from "../../types/reviews.type";

export class ReviewDatasourceImp implements ReviewsDatasource {
  addReview(review: OptionsReview): Promise<WriteResult> {
    try {
      const document = db.collection("review").doc();
      if (!document.id) {
        throw CustomErrors.InternalErrorServer("Review couldn't be created");
      }
      return document.set({
        ...review,
        id: document.id,
      });
    } catch (error) {
      if (error instanceof CustomErrors) throw error;
      throw CustomErrors.InternalErrorServer("Something Went Wrong" + error);
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
        .startAt(paginationReview.offset ?? 0)
        .limit(+paginationReview.limit)
        .get();

      if (!next) {
        throw CustomErrors.NotFound("No Reviews found with specific data");
      }

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
      if (error instanceof CustomErrors) throw error;
      throw CustomErrors.InternalErrorServer("Something Went Wrong" + error);
    }
  }
}

import { db, timeStamp, WriteResult } from "../../config/firebase";
import { ReviewEntity, ReviewsDatasource } from "../../domain";
import { CustomErrors } from "../../domain/errors/custom.errors";
import { OptionsReview, ReviewPagination } from "../../types/reviews.type";

export class ReviewDatasourceImp implements ReviewsDatasource {
  private handleError(error: any) {
    if (error instanceof CustomErrors) return error;
    return CustomErrors.InternalErrorServer("Something Went Wrong" + error);
  }

  addReview(
    review: OptionsReview
  ): Promise<{ ok: boolean; data: ReviewEntity }> {
    try {
      const document = db.collection("review").doc();
      if (!document.id) {
        throw CustomErrors.InternalErrorServer("Review couldn't be created");
      }

      document.set({
        ...review,
        id: document.id,
      });
      const newReview = ReviewEntity.Review({
        ...review,
        id: document.id,
      });

      return Promise.resolve({
        ok: true,
        data: newReview,
      });
    } catch (error) {
      throw this.handleError(error);
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
      throw this.handleError(error);
    }
  }

  async getReview(id: string): Promise<ReviewEntity> {
    try {
      const snap = await db.collection("task").doc(id).get();
      return ReviewEntity.fromFirebaseToClient({
        data: snap.data(),
        id: snap.id,
      });
    } catch (error) {
      throw this.handleError(error);
    }
  }

  updateReview(id: string, reviewUpdate: any): Promise<WriteResult> {
    try {
      const snap = db.collection("review").doc(id).update(reviewUpdate);
      db.collection("review").doc(id).update({
        timestamp: timeStamp,
      });

      return snap;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

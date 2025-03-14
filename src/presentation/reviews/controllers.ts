import { Request, Response } from "express";
import {
  AddReview,
  GetReview,
  GetReviews,
  ReviewsRepository,
  UpdateReview,
  CustomErrors,
} from "../../domain";
import { ReviewPagination } from "../../types/reviews.type";

export class ReviewControllers {
  constructor(private readonly reviewRepository: ReviewsRepository) {}
  private handleError(err: any, res: Response) {
    if (err instanceof CustomErrors) {
      res.status(err.statusCode).send({ ok: false, message: err.message });
      return;
    }

    res.status(500).send(err);
  }

  public reviews = async (req: Request, res: Response) => {
    const { limit = 10, offset = "" } =
      req.query as unknown as ReviewPagination;
    new GetReviews(this.reviewRepository)
      .execute({ limit, offset })
      .then((resp) => res.status(200).send(resp))
      .catch((err) => this.handleError(err, res));
  };

  public addReview = (req: Request, res: Response) => {
    new AddReview(this.reviewRepository)
      .execute(req.body)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => this.handleError(err, res));
  };

  public review = async (req: Request, res: Response) => {
    const { id } = req.params;
    new GetReview(this.reviewRepository)
      .execute(id)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => this.handleError(err, res));
  };

  public updateReview = (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    new UpdateReview(this.reviewRepository)
      .execute(id, body)
      .then((resp) => res.status(200).send(resp))
      .catch((err) => this.handleError(err, res));
  };
}

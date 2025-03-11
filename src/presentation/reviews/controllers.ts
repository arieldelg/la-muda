import { Request, Response } from "express";
import { AddReview, GetReview, ReviewsRepository } from "../../domain";
import { OptionsReview, ReviewPagination } from "../../types/reviews.type";

export class ReviewControllers {
  constructor(private readonly reviewRepository: ReviewsRepository) {}
  public review = async (req: Request, res: Response) => {
    const { limit, offset } = req.query as unknown as ReviewPagination;
    new GetReview(this.reviewRepository)
      .execute({ limit, offset })
      .then((resp) => res.status(200).send(resp))
      .catch((err) => res.status(500).send(err));
  };

  public addReview = (req: Request, res: Response) => {
    const { badge, description, image, tags, title } =
      req.body as OptionsReview;
    new AddReview(this.reviewRepository)
      .execute({
        badge,
        description,
        image,
        tags,
        title,
      })
      .then((resp) => res.status(200).send(resp))
      .catch((err) => res.status(500).send(err));
  };
}

import { Router } from "express";
import { ReviewControllers } from "./controllers";
import { ReviewDatasourceImp } from "../../infrastructure/datasource/review.datasource.imp";
import { ReviewsRepositoryImp } from "../../infrastructure/repositories/review.repositories.imp";
import { ReviewService } from "../services/review.service";

export class ReviewRoutes {
  static get routes() {
    const routes = Router();
    const reviewDatasource = new ReviewDatasourceImp();
    const reviewRepository = new ReviewsRepositoryImp(reviewDatasource);
    const reviewControllers = new ReviewControllers(reviewRepository);

    routes.get("/", reviewControllers.reviews);
    routes.get("/:id");
    routes.post("/", ReviewService.validateValue, reviewControllers.addReview);
    routes.put(
      "/:id",
      ReviewService.validateUpdateValues,
      reviewControllers.updateReview
    );
    return routes;
  }
}

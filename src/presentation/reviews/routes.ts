import { Router } from "express";
import { ReviewControllers } from "./controllers";
import { ReviewDatasourceImp } from "../../infrastructure/datasource/review.datasource.imp";
import { ReviewsRepositoryImp } from "../../infrastructure/repositories/review.repositories.imp";

export class ReviewRoutes {
  static get routes() {
    const routes = Router();
    const reviewDatasource = new ReviewDatasourceImp();
    const reviewRepository = new ReviewsRepositoryImp(reviewDatasource);
    const reviewControllers = new ReviewControllers(reviewRepository);
    routes.get("/get", reviewControllers.review);
    routes.post("/", reviewControllers.addReview);
    return routes;
  }
}

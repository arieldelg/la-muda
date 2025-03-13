import {
  OptionsReview,
  Review,
  ReviewFirebase,
} from "../../types/reviews.type";

export class ReviewEntity {
  public badge: string;
  public description: string;
  public id: string;
  public images?: string[];
  public tags: string[];
  public title: string;

  constructor({ badge, description, id, images, tags, title }: Review) {
    this.badge = badge;
    this.description = description;
    this.id = id;
    this.images = images;
    this.tags = tags;
    this.title = title;
  }

  public static fromFirebaseToClient(object: ReviewFirebase) {
    const { badge, description, images, tags, title } =
      object.data as OptionsReview;
    return new ReviewEntity({
      id: object.id,
      badge,
      description,
      images,
      tags,
      title,
    });
  }
}

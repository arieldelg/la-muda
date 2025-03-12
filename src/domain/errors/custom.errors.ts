export class CustomErrors extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super();
  }

  static BadRequest(message: string) {
    return new CustomErrors(400, message);
  }

  static UnAuthorized(message: string) {
    return new CustomErrors(401, message);
  }

  static Forbidden(message: string) {
    return new CustomErrors(403, message);
  }

  static NotFound(message: string) {
    return new CustomErrors(404, message);
  }

  static InternalErrorServer(message: string) {
    return new CustomErrors(500, message);
  }
}

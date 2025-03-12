import { NextFunction, Request, Response } from "express";
import { reviewObject, SecurityKeys } from "../../types/reviews.type";
import { CustomErrors } from "../../domain/errors/custom.errors";

export class ReviewService {
  private static checkValuesArray(
    body: Record<string, string>,
    key: SecurityKeys
  ) {
    switch (key) {
      case "image":
      case "tags": {
        if (!Array.isArray(body[key])) {
          return {
            ok: false,
            message: `${key} is not an Array`,
          };
        }
        const response = body[key].every((x) => typeof x === "string");
        if (!response) {
          return {
            ok: false,
            message: `${key} needs to be an string of array`,
          };
        }
        return {
          ok: true,
        };
      }
      default:
        if (typeof body[key] !== reviewObject[key]) {
          return {
            ok: false,
            message: "Incorrect value",
          };
        }
        return {
          ok: true,
        };
    }
  }

  private static checkPermitValues(body: Record<string, string>): {
    ok: boolean;
    message: string;
    data?: typeof reviewObject;
  } {
    const newBody = {} as typeof reviewObject;
    for (const keys of Object.keys(reviewObject)) {
      const key = keys as SecurityKeys;

      if (body[key] === undefined) {
        return {
          ok: false,
          message: `Missing property ${key}`,
        };
      }

      if (body[key].length === 0) {
        return {
          ok: false,
          message: `Empty value in property ${key}`,
        };
      }

      const { ok, message } = this.checkValuesArray(body, key);
      if (!ok) {
        return {
          ok,
          message: message ?? "Error in array Values",
        };
      }

      if (key in newBody) {
        return {
          ok: false,
          message: `Property ${key} is duplicated`,
        };
      }

      Object.assign(newBody, { [key]: body[key] });
    }

    return {
      ok: true,
      message: "All key values are correct",
      data: newBody,
    };
  }

  static readonly validateValue = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body as typeof reviewObject;
    if (Object.keys(body).length === 0) {
      res.status(400).send(CustomErrors.BadRequest("Missing properties"));
      return;
    }

    const resp = this.checkPermitValues(body);
    const { message, ok } = resp;
    if (!ok) {
      res.status(400).send(CustomErrors.BadRequest(message));
      return;
    }
    req.body = resp.data;

    next();
  };
}

import { NextFunction, Request, Response } from "express";
import { reviewObject, SecurityKeys } from "../../types/reviews.type";
import { CustomErrors } from "../../domain/errors/custom.errors";

export class ReviewService {
  private static newReqBody = {};

  private static checkValuesArray(
    body: Record<string, string>,
    key: SecurityKeys
  ) {
    if (body[key].length === 0) {
      return {
        ok: false,
        message: `Empty value in property ${key}`,
      };
    }

    if (!Array.isArray(body[key])) {
      return {
        ok: false,
        message: `${key} is not an Array`,
      };
    }

    const length = body[key].every((x) => x.length > 0);
    const typeValue = body[key].every((x) => typeof x === "string");
    if (!typeValue || !length) {
      return {
        ok: false,
        message: !typeValue
          ? `${key} needs to be an string of array`
          : `${key} array is an empty string`,
      };
    }

    return {
      ok: true,
      message: "property's and Values accepted",
    };
  }

  private static checkValues(
    body: Record<string, string>,
    key: SecurityKeys
  ): { ok: boolean; message: string } {
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

    if (typeof body[key] !== reviewObject[key]) {
      return {
        ok: false,
        message: "Values not accepted for property " + key,
      };
    }

    return {
      ok: true,
      message: "property's and Values accepted",
    };
  }

  private static checkReqBody(): {
    ok: boolean;
    message: string;
  } {
    const body = this.newReqBody as typeof reviewObject;

    for (const keys of Object.keys(body)) {
      const key = keys as SecurityKeys;

      switch (key) {
        case "tags":
        case "images": {
          const { ok, message } = this.checkValuesArray(body, key);
          if (!ok) {
            return {
              ok,
              message,
            };
          }

          break;
        }

        case "description":
        case "title": {
          const { message, ok } = this.checkValues(body, key);

          if (!ok) {
            return {
              ok,
              message,
            };
          }

          break;
        }
        case "badge": {
          if (body[key].length === 0) {
            return {
              ok: false,
              message: `Empty value in property ${key}`,
            };
          }

          if (typeof body[key] !== reviewObject[key]) {
            return {
              ok: false,
              message: "Values not accepted for property " + key,
            };
          }

          break;
        }
        default:
          break;
      }
    }

    return {
      ok: true,
      message: "All key values are correct",
    };
  }

  private static filterAcceptedValues(body: Record<string, string>): {
    ok: boolean;
    key?: string;
  } {
    for (const key of Object.keys(reviewObject)) {
      if (body[key] === undefined) {
        return { ok: false, key };
      }
      if (body[key]) {
        Object.assign(this.newReqBody, { [key]: body[key] });
      }
    }
    return { ok: true };
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

    const filter = this.filterAcceptedValues(body);
    if (!filter.ok) {
      res
        .status(400)
        .send(CustomErrors.BadRequest(`property ${filter.key} is missing`));
      return;
    }

    const resp = this.checkReqBody();
    const { message, ok } = resp;
    if (!ok) {
      res.status(400).send(CustomErrors.BadRequest(message));
      return;
    }

    req.body = this.newReqBody;
    this.newReqBody = {};

    next();
  };

  // static readonly validateUpdateValues = (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   const body = req.body;
  // };
}

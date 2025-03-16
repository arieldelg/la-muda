import { NextFunction, Request, Response } from "express";
import { reviewObject, SecurityKeys } from "../../types/reviews.type";
import { CustomErrors } from "../../domain/errors/custom.errors";
import { ImageResponse } from "../../types/images.types";

export class ReviewService {
  private static newReqBody = {};
  private static createErrorResponse(message: string): {
    ok: boolean;
    message: string;
  } {
    return {
      ok: false,
      message,
    };
  }

  private static checkEmptyObject(body: any): { ok: boolean; message: string } {
    if (Object.keys(body).length === 0) {
      return {
        ok: false,
        message: "Missing properties",
      };
    }
    return {
      ok: true,
      message: "Everything is ok",
    };
  }

  private static checkObject(
    object: ImageResponse,
    type: Record<string, string>
  ) {
    const acceptedValues = {} as { url: string; id: string };
    for (const key of Object.keys(type)) {
      const imageKeys = key as "id" | "url";
      if (!object[imageKeys]) {
        return {
          ok: false,
          message: `Missing property ${imageKeys} in array images`,
        };
      }
      if (typeof object[imageKeys] !== type[imageKeys]) {
        return {
          ok: false,
          message: `Invalid Values in property ${imageKeys}`,
        };
      }
      Object.assign(acceptedValues, { [imageKeys]: object[imageKeys] });
    }

    return {
      ok: true,
      message: "Accepted Values in array",
      data: acceptedValues,
    };
  }

  private static checkValuesArray(
    body: string[] | ImageResponse[],
    key: SecurityKeys
  ) {
    if (this.isBodyInvalid(body)) {
      return this.createErrorResponse(`Property ${body} is missing/empty`);
    }

    if (!Array.isArray(body)) {
      return this.createErrorResponse(`${key} is not an Array`);
    }

    let isValid: boolean = true;
    let newValueArray: { url: string; id: string }[] = [];
    for (const item of body) {
      if (key === "tags") {
        isValid = this.validateTags(item as string);
      }

      if (key === "images") {
        const response = this.validateImages(item as ImageResponse);
        if (!response.ok) {
          isValid = response.ok;
          break;
        }
        newValueArray.push(response.data!);
      }
    }

    if (!isValid) {
      return this.createInvalidArrayResponse(key);
    }

    if (key === "images") {
      Object.assign(this.newReqBody, { images: newValueArray });
    }

    return {
      ok: true,
      message: "property's and Values accepted",
    };
  }

  private static isBodyInvalid(body: string[] | ImageResponse[]) {
    return body === undefined || body.length === 0;
  }

  private static validateTags(itemTags: string) {
    return !(itemTags.length === 0 || typeof itemTags !== "string");
  }

  private static validateImages(itemImages: ImageResponse) {
    return this.checkObject(itemImages, {
      url: "string",
      id: "string",
    });
  }

  private static createInvalidArrayResponse(key: SecurityKeys) {
    return {
      ok: false,
      message:
        key === "images"
          ? `${key} is not an image`
          : `${key} array contains invalid values (should be non-empty strings)`,
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

    if (body[key].length === 0 && key !== "badge") {
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

    for (const keys of Object.keys(reviewObject)) {
      const key = keys as SecurityKeys;

      switch (key) {
        case "tags":
        case "images": {
          const checkBody = body[key] as unknown as string[] | ImageResponse[];
          const { ok, message } = this.checkValuesArray(checkBody, key);
          if (!ok) {
            return {
              ok,
              message,
            };
          }

          break;
        }
        case "badge":
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
    for (const keys of Object.keys(body)) {
      const key = keys as SecurityKeys;
      if (reviewObject[key]) {
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
    const isEmpty = this.checkEmptyObject(body);
    if (!isEmpty.ok) {
      res.status(400).send(CustomErrors.BadRequest(isEmpty.message));
      return;
    }

    const filter = this.filterAcceptedValues(body);
    if (!filter.ok) {
      this.newReqBody = {};
      res
        .status(400)
        .send(CustomErrors.BadRequest(`property ${filter.key} is missing`));
      return;
    }

    const resp = this.checkReqBody();
    const { message, ok } = resp;
    if (!ok) {
      this.newReqBody = {};
      res.status(400).send(CustomErrors.BadRequest(message));
      return;
    }

    req.body = this.newReqBody;
    this.newReqBody = {};

    next();
  };

  static readonly validateUpdateValues = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    const isEmpty = this.checkEmptyObject(body);
    if (!isEmpty.ok) {
      res.status(400).send(CustomErrors.BadRequest(isEmpty.message));
      return;
    }

    const { ok, key } = this.filterAcceptedValues(body);
    if (!ok) {
      this.newReqBody = {};
      res
        .status(400)
        .send(CustomErrors.BadRequest(`property ${key} is missing`));
      return;
    }

    const resp = this.checkReqBody();

    if (!resp.ok) {
      this.newReqBody = {};
      res.status(400).send(CustomErrors.BadRequest(resp.message));
      return;
    }

    req.body = this.newReqBody;
    this.newReqBody = {};
    next();
  };
}

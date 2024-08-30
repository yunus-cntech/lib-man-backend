import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";
import ResponseModel from "../models/response.model";
import BookModel from "../models/book.model";

function validateRequest(dtoClass: any) {
  return (
    req: Request,
    res: Response<ResponseModel<BookModel>>,
    next: NextFunction
  ) => {
    const dtoObj = plainToInstance(dtoClass, req.body);

    validate(dtoObj).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors
          .map((error) => Object.values(error.constraints!))
          .join(", ");
        return res.status(400).json({ error: message });
      } else {
        next();
      }
    });
  };
}

export default validateRequest;

import { Response } from "express";

export default class ResponseModel<T> {
  data?: T | null;
  error?: string;
}

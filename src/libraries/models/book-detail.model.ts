import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class BookDetailModel {
  @IsNumber()
  id?: number | bigint;

  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsNumber()
  rating?: number | null;
}

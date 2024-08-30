import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class BookModel {
  @IsNumber()
  id: number | bigint;

  @IsString()
  @IsNotEmpty()
  name: string;
}

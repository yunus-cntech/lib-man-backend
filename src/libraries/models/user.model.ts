import { IsNumber, IsString } from "class-validator";

export default class UserModel {
  @IsNumber()
  id: number | bigint;

  @IsString()
  name: string;
}

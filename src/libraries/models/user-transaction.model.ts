import { IsNumber } from "class-validator";

export class UserTransactionModel {
  @IsNumber()
  id: bigint | number;
  

  @IsNumber()
  userId: bigint | number;

  @IsNumber()
  bookId: bigint | number;
}

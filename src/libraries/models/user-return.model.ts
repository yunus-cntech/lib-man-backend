import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

class UserReturnModel {
  @IsNumber({})
  @Min(0)
  @Max(10)
  @IsNotEmpty()
  score: number;
}

export default UserReturnModel;

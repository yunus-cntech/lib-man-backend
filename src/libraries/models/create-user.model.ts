import { IsNotEmpty, IsString } from "class-validator";

class CreateUserModel {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export default CreateUserModel;

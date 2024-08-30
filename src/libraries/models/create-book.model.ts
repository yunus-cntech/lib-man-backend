import { IsNotEmpty, IsString } from "class-validator";

class CreateBookModel {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export default CreateBookModel;

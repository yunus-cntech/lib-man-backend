import BookModel from "./book.model";
import UserModel from "./user.model";

interface UserBookDetail {
  past: BookModel[];
  present: BookModel[];
}

export class UserDetailModel extends UserModel {
  books: UserBookDetail;
}

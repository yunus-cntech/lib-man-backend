import BookService from "./services/book.service";
import { UserService } from "./services/user.service";

declare module "express-serve-static-core" {
  interface Request {
    userService?: UserService;
    bookService?: BookService;
  }
}

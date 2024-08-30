import { NextFunction, Request, Response, Router } from "express";
import ResponseModel from "../libraries/models/response.model";
import BookModel from "../libraries/models/book.model";
import BookService from "../services/book.service";
import CreateBookModel from "../libraries/models/create-book.model";
import validateRequest from "../libraries/middlewares/validate-request";
import BookDetailModel from "../libraries/models/book-detail.model";
class BookController {
  bookService: BookService;
  router: Router;
  constructor(bookService: BookService) {
    this.bookService = bookService;
    this.router = Router();
    this.router.use((req: Request, res: Response, next: NextFunction) => {
      req.bookService = this.bookService;
      next();
    });
    this.router.get("/books", this.getBooks);
    this.router.get("/books/:bookId", this.getBookById);
    this.router.post(
      "/books",
      validateRequest(CreateBookModel),
      this.createBook
    );
  }

  routes() {
    return this.router;
  }

  async getBooks(req: Request, res: Response<ResponseModel<BookModel[]>>) {
    const result = await req.bookService?.getBooks();
    if (result?.error) {
      res.json({ data: null, error: result.error.message });
    } else {
      res.json({ data: result?.data });
    }
  }
  async getBookById(
    req: Request,
    res: Response<ResponseModel<BookDetailModel>>
  ) {
    const { bookId } = req.params;
    const result = await req.bookService?.getBookById(Number(bookId));

    if (result?.error) {
      res.json({ data: null, error: result.error.message });
    } else {
      res.json({ data: result?.data });
    }
  }

  async createBook(req: Request, res: Response<ResponseModel<BookModel>>) {
    const data: CreateBookModel = req.body;
    const result = await req.bookService?.createBook(data);

    if (result?.error) {
      res.json({ data: null, error: result.error.message });
    } else {
      res.json({ data: result?.data });
    }
  }
}

export default BookController;

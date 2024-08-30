import BookRepository from "../repositories/book.repository";
import BookModel from "../libraries/models/book.model";
import ServiceResultModel from "../libraries/models/service-result.model";
import CreateBookModel from "../libraries/models/create-book.model";
import { Book } from "@prisma/client";
import BookDetailModel from "../libraries/models/book-detail.model";

export default class BookService {
  bookRepository: BookRepository;
  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository;
  }

  async getBooks(): Promise<ServiceResultModel<BookModel[]>> {
    try {
      const result: BookModel[] = await this.bookRepository.getBooks();
      return {
        error: null,
        data: result,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return {
          data: null,
          error,
        };
      }
      return {
        data: null,
        error: new Error("Error occured while fetching books. See logs"),
      };
    }
  }

  async getBookById(
    bookId: number
  ): Promise<ServiceResultModel<BookDetailModel>> {
    try {
      const result: BookDetailModel | null =
        await this.bookRepository.getBookById(bookId);
      if (!result) {
        return {
          data: null,
          error: new Error(`"No book found having id: ${bookId}`),
        };
      }
      return {
        error: null,
        data: result,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return {
          data: null,
          error,
        };
      }
      return {
        data: null,
        error: new Error("Error occured while fetching book. See logs"),
      };
    }
  }

  async createBook(
    data: CreateBookModel
  ): Promise<ServiceResultModel<BookModel>> {
    try {
      const result: Book | null = await this.bookRepository.createBook(data);
      return {
        data: result,
        error: null,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return {
          data: null,
          error,
        };
      }
      return {
        data: null,
        error: new Error("Error occured while creating user. See logs"),
      };
    }
  }
}

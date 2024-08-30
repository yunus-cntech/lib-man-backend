import { Book, PrismaClient } from "@prisma/client";
import BookModel from "../libraries/models/book.model";
import CreateBookModel from "../libraries/models/create-book.model";

export default class BookRepository {
  prismaService: PrismaClient;
  constructor(prismaService: PrismaClient) {
    this.prismaService = prismaService;
  }

  getBooks() {
    return this.prismaService.book.findMany({});
  }

  async getBookById(bookId: number) {
    const bookRating = await this.prismaService.userTransactions.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        bookId: bookId,
        endDate: {
          not: null,
        },
      },
    });
    const book = await this.prismaService.book.findFirst({
      select: {
        id: true,
        name: true,
      },
      where: {
        id: bookId,
      },
    });

    if (!book) {
      throw new Error("Book not found");
    }

    return {
      ...book,
      rating: bookRating._avg.rating,
    };
  }

  createBook(data: CreateBookModel): Promise<Book> {
    return this.prismaService.book.create({ data });
  }
}

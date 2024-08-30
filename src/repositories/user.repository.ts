import { PrismaClient, User, UserTransactions } from "@prisma/client";
import { getUnixTime } from "date-fns";
import { UserDetailModel } from "../libraries/models/user-detail.model";
import CreateUserModel from "../libraries/models/create-user.model";

export class UserRepository {
  prismaService: PrismaClient;
  constructor(prismaService: PrismaClient) {
    this.prismaService = prismaService;
  }

  public async getUsers() {
    return this.prismaService.user.findMany({});
  }

  async getUserById(userId: number) {
    const pastBooksPromise = this.prismaService.book.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        userTransactions: {
          some: {
            userId,
            endDate: {
              not: null,
            },
          },
        },
      },
    });
    const presentBookPromise = this.prismaService.book.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        userTransactions: {
          some: {
            userId,
            endDate: null,
          },
        },
      },
    });

    const user = await this.prismaService.user.findFirst({
      select: {
        id: true,
        name: true,
      },
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("No user found");
    }

    const results = await Promise.all([pastBooksPromise, presentBookPromise]);

    const data: UserDetailModel = {
      ...user,
      books: {
        past: results[0],
        present: results[1],
      },
    };

    return data;
  }

  createUser(data: CreateUserModel): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  async userBorrow(userId: number, bookId: number): Promise<UserTransactions> {
    const isAlreadyBorrowed =
      await this.prismaService.userTransactions.findFirst({
        where: {
          bookId,
          endDate: null,
        },
      });
    if (isAlreadyBorrowed) {
      throw new Error("Book already borrowed");
    }
    const date = getUnixTime(new Date());
    return this.prismaService.userTransactions.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        book: {
          connect: {
            id: bookId,
          },
        },
        rating: null,
        startDate: date,
      },
    });
  }

  async userReturn(
    userId: number,
    bookId: number,
    rating: number
  ): Promise<UserTransactions> {
    const date = getUnixTime(new Date());

    const transaction = await this.prismaService.userTransactions.findFirst({
      where: {
        userId,
        bookId,
        endDate: null,
      },
    });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    return this.prismaService.userTransactions.update({
      data: {
        endDate: date,
        rating,
      },
      where: {
        id: transaction?.id,
      },
    });
  }
}

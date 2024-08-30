import ServiceResultModel from "../libraries/models/service-result.model";
import UserModel from "../libraries/models/user.model";
import { UserDetailModel } from "../libraries/models/user-detail.model";
import { UserRepository } from "../repositories/user.repository";
import CreateUserModel from "../libraries/models/create-user.model";
import { User, UserTransactions } from "@prisma/client";

export class UserService {
  userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async getUsers(): Promise<ServiceResultModel<UserModel[]>> {
    try {
      const result: UserModel[] = await this.userRepository.getUsers();
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
        error: new Error("Error occured while fetching users. See logs"),
      };
    }
  }

  async getUserById(
    userId: number
  ): Promise<ServiceResultModel<UserDetailModel>> {
    try {
      const result: UserDetailModel | null =
        await this.userRepository.getUserById(userId);
      if (!result) {
        return {
          error: new Error(`"No user found having id: ${userId}`),
          data: null,
        };
      }
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
        error: new Error("Error occured while fetching user details. See logs"),
      };
    }
  }

  async createUser(
    data: CreateUserModel
  ): Promise<ServiceResultModel<UserModel>> {
    try {
      const result: User | null = await this.userRepository.createUser(data);
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

  async userBorrow(userId: number, bookId: number) {
    try {
      const result: UserTransactions | null =
        await this.userRepository.userBorrow(userId, bookId);
      return {
        data: result ? true : false,
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
        error: new Error("Error occured while borrowing book. See logs"),
      };
    }
  }

  async userReturn(userId: number, bookId: number, rating: number) {
    try {
      const result: UserTransactions | null =
        await this.userRepository.userReturn(userId, bookId, rating);
      return {
        data: result ? true : false,
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
        error: new Error("Error occured while returning book. See logs"),
      };
    }
  }
}

import express, { NextFunction, Request, Response, Router } from "express";
import UserModel from "../libraries/models/user.model";
import ResponseModel from "../libraries/models/response.model";
import { UserService } from "../services/user.service";
import CreateUserModel from "../libraries/models/create-user.model";
import validateRequest from "../libraries/middlewares/validate-request";
import UserReturnModel from "../libraries/models/user-return.model";

export class UserController {
  router: Router;
  userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
    this.router = express.Router();
    // Dependency injection is better way to do it. Nestjs handles all
    this.router.use((req: Request, res: Response, next: NextFunction) => {
      req.userService = this.userService;
      next();
    });
    this.router.get("/users", this.getUsers);
    this.router.get("/users/:userId", this.getUserById);
    this.router.post(
      "/users",
      validateRequest(CreateUserModel),
      this.createUser
    );
    this.router.post("/users/:userId/borrow/:bookId", this.borrowBook);
    this.router.post(
      "/users/:userId/return/:bookId",
      validateRequest(UserReturnModel),
      this.returnBook
    );
  }

  routes() {
    return this.router;
  }

  async getUsers(req: Request, res: Response<ResponseModel<UserModel[]>>) {
    const result = await req.userService?.getUsers();
    if (result?.error) {
      res.json({ data: null, error: result.error.message });
    } else {
      res.json({ data: result?.data });
    }
  }

  async getUserById(req: Request, res: Response<ResponseModel<UserModel>>) {
    const { userId } = req.params;
    const result = await req.userService?.getUserById(Number(userId));

    if (result?.error) {
      res.json({ data: null, error: result.error.message });
    } else {
      res.json({ data: result?.data });
    }
  }

  async createUser(req: Request, res: Response<ResponseModel<UserModel>>) {
    const data: CreateUserModel = req.body;
    const result = await req.userService?.createUser(data);

    if (result?.error) {
      res.json({ data: null, error: result.error.message });
    } else {
      res.json({ data: result?.data });
    }
  }

  async borrowBook(req: Request, res: Response) {
    const { userId, bookId } = req.params;
    const result = await req.userService?.userBorrow(
      Number(userId),
      Number(bookId)
    );

    if (result?.error) {
      res.json({ data: null, error: result.error.message });
    } else {
      res.json({ data: result?.data });
    }
  }
  async returnBook(req: Request, res: Response) {
    const { userId, bookId } = req.params;
    const { score } = req.body;
    const result = await req.userService?.userReturn(
      Number(userId),
      Number(bookId),
      Number(score)
    );

    if (result?.error) {
      res.json({ data: null, error: result.error.message });
    } else {
      res.json({ data: result?.data });
    }
  }
}

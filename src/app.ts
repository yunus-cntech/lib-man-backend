import express from "express";
import { UserService } from "./services/user.service";
import { PrismaClient } from "@prisma/client";
import { UserRepository } from "./repositories/user.repository";
import { UserController } from "./controllers/user.controller";
import bodyParser from "body-parser";
import bigIntMiddleware from "./libraries/helpers/bigint-middleware";
import BookRepository from "./repositories/book.repository";
import BookService from "./services/book.service";
import BookController from "./controllers/book.controller";

function app() {
  const app = express();
  app.use(bodyParser.json());

  const prismaService = new PrismaClient();
  prismaService.$use(bigIntMiddleware());
  const userRepository = new UserRepository(prismaService);
  const bookRepository = new BookRepository(prismaService);
  const userService = new UserService(userRepository);
  const bookService = new BookService(bookRepository);
  const userController = new UserController(userService);
  const bookController = new BookController(bookService);
  app.use(userController.routes());
  app.use(bookController.routes());
  return app;
}

export default app;

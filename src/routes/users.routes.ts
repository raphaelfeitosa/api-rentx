import { Router } from "express";
import { CreateUserController } from "../modules/accounts/userCases/createUser/CreateUserController";

const usersRoutes = Router();

const createController = new CreateUserController();

usersRoutes.post("/", createController.handle);


export { usersRoutes };
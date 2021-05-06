import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


import { CreateUserController } from "../modules/accounts/userCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/userCases/updatedAvatar/UpdateUserAvatarController";



const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createController = new CreateUserController();

const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createController.handle);

usersRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);


export { usersRoutes };
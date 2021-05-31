import { ResetPasswordUserController } from "@modules/accounts/userCases/resetPasswordUser/resetPasswordUserController";
import { SendForgotPasswordMailUseCaseController } from "@modules/accounts/userCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendForgotPasswordMailUseCaseController = new SendForgotPasswordMailUseCaseController();
const resetPasswordController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailUseCaseController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };
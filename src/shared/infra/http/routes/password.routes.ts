import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/resetPasswordUserController";
import { SendForgotPasswordMailUseCaseController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendForgotPasswordMailUseCaseController = new SendForgotPasswordMailUseCaseController();
const resetPasswordController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailUseCaseController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes };
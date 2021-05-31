import { SendForgotPasswordMailUseCaseController } from "@modules/accounts/userCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendForgotPasswordMailUseCaseController = new SendForgotPasswordMailUseCaseController()

passwordRoutes.post("/forgot", sendForgotPasswordMailUseCaseController.handle);

export { passwordRoutes };
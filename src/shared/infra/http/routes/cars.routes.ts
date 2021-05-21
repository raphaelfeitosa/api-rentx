import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";


const carsRoutes = Router();

const carsUserController = new CreateCarController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, carsUserController.handle);

export { carsRoutes };
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";


const carsRoutes = Router();

const carsUserController = new CreateCarController();

carsRoutes.post("/", carsUserController.handle);

export { carsRoutes };
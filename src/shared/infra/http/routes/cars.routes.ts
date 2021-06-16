import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImagesController";
import multer from "multer";
import uploadConfig from "../../../../config/upload";


const carsRoutes = Router();


const upload = multer(uploadConfig);

const carsUserController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageUseCase = new UploadCarImageController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, carsUserController.handle);
carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);
carsRoutes.post("/images/:id", ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarImageUseCase.handle);
carsRoutes.get("/available", listAvailableCarsController.handle);


export { carsRoutes };
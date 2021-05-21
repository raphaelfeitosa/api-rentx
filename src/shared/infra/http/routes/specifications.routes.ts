import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";


const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();


//specificationsRoutes.use(ensureAuthenticated);//middleware vai ser utilizado em todas as rotas
specificationsRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

// specificationsRoutes.get("/", (request, response) => {

//     const all = specificationsRepository.list();

//     return response.json(all);
// });

export { specificationsRoutes };
import { Router } from "express"
import { CompanyController } from "./company.controller"

const companyRouter = Router()
const companyController = new CompanyController()

companyRouter.get("/", companyController.index)
companyRouter.post("/", companyController.store)
companyRouter.put("/:id", companyController.update)
companyRouter.delete("/:id", companyController.delete)

export { companyRouter }

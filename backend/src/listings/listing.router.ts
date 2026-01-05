import { Router } from "express"
import { ListingsController } from "./listings.controller"

const listingsRouter = Router()
const listingsController = new ListingsController()

listingsRouter.get("/", listingsController.index)
listingsRouter.post("/", listingsController.store)
listingsRouter.put("/:id", listingsController.update)
listingsRouter.delete("/:id", listingsController.delete)

export { listingsRouter }

const express = require("express")
const route = express.Router()

const services = require("../services/render")
const controller = require("../controller/controller")

/**
 * @description Root Route
 * @method GET /
 */
route.get("/", services.homeRoutes)

/**
 * @description add guitar
 * @method GET /add-guitar
 */
route.get("/add-guitar", services.addGuitar)

/**
 * @description update guitar
 * @method GET /update-guitar
 */
route.get("/update-guitar", services.updateGuitar)

//API
route.post("/api/guitars", controller.create)
route.get("/api/guitars", controller.find)
route.put("/api/guitars/:id", controller.update)
route.delete("/api/guitars/:id", controller.delete)

module.exports = route

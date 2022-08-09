import express from "express";
import { createList, updateList, deleteList, getLists } from "../../controllers/listControllers/list.controllers.js";
import verifyToken from "../../middlewares/verifyToken.js";

const route = express.Router();

route.post("/list", verifyToken, createList);
route.put("/update/:id", verifyToken, updateList);
route.delete("/delete/:id", verifyToken, deleteList);
route.get("/stats", verifyToken, getLists);

export default route;
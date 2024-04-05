import { Router } from "express";
import {
  addType,
  deleteType,
  getAllType,
  getOneType,
  updateType,
} from "../controllers/type";
import { checkIsAdmin } from "../middlewares/checkIsAdmin";

const routerTypeProduct = Router();
routerTypeProduct.get("/", getAllType);
routerTypeProduct.get("/:id", getOneType);
routerTypeProduct.delete("/:id", deleteType, checkIsAdmin);
routerTypeProduct.put("/:id", updateType, checkIsAdmin);
routerTypeProduct.post("/", addType, checkIsAdmin);

export default routerTypeProduct;

import { Router } from "express";
import {
  addSize,
  deleteSize,
  getAllSize,
  getOneSize,
  updateSize,
} from "../controllers/size";
import { checkIsAdmin } from "../middlewares/checkIsAdmin";

const routerSizeProduct = Router();
routerSizeProduct.get("/", getAllSize);
routerSizeProduct.get("/:id", getOneSize);
routerSizeProduct.delete("/:id", deleteSize, checkIsAdmin);
routerSizeProduct.put("/:id", updateSize, checkIsAdmin);
routerSizeProduct.post("/", addSize, checkIsAdmin);

export default routerSizeProduct;

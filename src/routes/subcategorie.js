import { Router } from "express";
import {
  addSubCategories,
  deleteSubCategories,
  getAllSubCategories,
  getOneSubCategories,
  updateSubCategories,
} from "../controllers/subcategory";
import { checkIsAdmin } from "../middlewares/checkIsAdmin";

const routerSubCategories = Router();
routerSubCategories.get("/", getAllSubCategories);
routerSubCategories.get("/:id", getOneSubCategories);
routerSubCategories.delete("/:id", deleteSubCategories, checkIsAdmin);
routerSubCategories.post("/", addSubCategories, checkIsAdmin);
routerSubCategories.put("/:id", updateSubCategories, checkIsAdmin);

export default routerSubCategories;

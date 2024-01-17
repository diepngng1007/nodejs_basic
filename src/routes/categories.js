import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getOneCategoryById,
  getOneCategoryByName,
  getOneCategoryBySlug,
  updateCategory,
} from "../controllers/category";
import { checkIsAdmin } from "../middlewares/checkIsAdmin";
import { checkRequestBodyCategory } from "../middlewares/checkResquestBodyCategory";


const routerCategory = Router();
routerCategory.get("/", getAllCategory);
routerCategory.delete("/:id", deleteCategory);
routerCategory.post("/", addCategory, checkIsAdmin, checkRequestBodyCategory);
routerCategory.put("/:id", updateCategory);
routerCategory.get("/slug", getOneCategoryBySlug);
routerCategory.get("/id/:id", getOneCategoryById);
routerCategory.get("/name/:name", getOneCategoryByName);

export default routerCategory;

import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getOneCategory,
  getOneCategoryById,
  getOneCategoryByName,
  getOneCategoryBySlug,
  updateCategory,
} from "../controllers/category";
import { checkIsAdmin } from "../middlewares/checkIsAdmin";
import { checkRequestBodyCategory } from "../middlewares/checkResquestBodyCategory";
import { authenticate } from "../middlewares/authenticate";
import { authorization } from "../middlewares/authoraization";


const routerCategory = Router();
routerCategory.get("/", getAllCategory);
routerCategory.get("/:id", getOneCategory)
routerCategory.delete("/:id", deleteCategory, checkIsAdmin);
routerCategory.post("/", addCategory, checkIsAdmin);
routerCategory.put("/:id", updateCategory, checkIsAdmin);
// routerCategory.get("/slug", getOneCategoryBySlug);
// routerCategory.get("/id/:id", getOneCategoryById);
// routerCategory.get("/name", getOneCategoryByName);

export default routerCategory;

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
import { authenticate } from "../middlewares/authenticate";
import { authorization } from "../middlewares/authoraization";


const routerCategory = Router();
routerCategory.get("/", getAllCategory);
routerCategory.delete("/:id", authenticate, authorization, deleteCategory);
routerCategory.post("/", authenticate, authorization, addCategory, checkRequestBodyCategory);
routerCategory.put("/:id", authenticate, authorization, updateCategory);
routerCategory.get("/slug", getOneCategoryBySlug);
routerCategory.get("/id/:id", getOneCategoryById);
routerCategory.get("/name/:name", getOneCategoryByName);

export default routerCategory;

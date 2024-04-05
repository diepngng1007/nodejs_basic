import { Router } from "express";
import routerProduct from "./product";
import authRouter from "./auth";
import routerCategory from "./categories";
import routerSubCategories from "./subcategorie";
import routerTypeProduct from "./type";
import routerSizeProduct from "./size";


const router = Router();
router.use("/products", routerProduct);
router.use("/auth", authRouter);
router.use("/categories", routerCategory)
router.use("/subcategories", routerSubCategories)
router.use("/type", routerTypeProduct)
router.use("/size", routerSizeProduct)
// router.use("/admin", routerAdmin);

export default router;
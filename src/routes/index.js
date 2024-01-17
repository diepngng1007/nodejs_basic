import { Router } from "express";
import routerProduct from "./product";
import authRouter from "./auth";
import routerCategory from "./categories";


const router = Router();
router.use("/products", routerProduct);
router.use("/auth", authRouter);
router.use("/categories", routerCategory)
// router.use("/admin", routerAdmin);

export default router;
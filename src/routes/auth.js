import { Router } from "express";
import { getAllUser,getOneUser,logOut, signIn, signUp } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/", getAllUser)
authRouter.get("/:id_user", getOneUser)
// authRouter.post("/signin", (req,res)=>{
//     console.log(req.body)
//     res.send("success")
// });
authRouter.post("/logout", logOut);

export default authRouter;

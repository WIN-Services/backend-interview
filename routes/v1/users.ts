import { Request,Response, Router} from "express";
import userFunctions from "../../controller/v1/users"

const router: Router = Router();

router.get("/",userFunctions.getUsers);

router.post("/",userFunctions.addUser);

router.put("/:id",userFunctions.updateUser);

router.delete("/:id",userFunctions.deleteUser);

export default router
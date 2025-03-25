import { Request, Response, Router } from "express";
import { createUserController } from "../controllers/user/create-controller";

const routes = Router();
routes.use('/create', async (req: Request, res: Response) => {
    await createUserController(req, res);
});

export default routes;

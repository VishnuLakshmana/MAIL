import { Router } from "express";
import mailController from "./mail.controller.js";
const router = Router();
router.post("/mail", mailController.create);
router.get("/mail", mailController.list);
router.get("/mail/failed", mailController.failed);
router.get("/mail/:id", mailController.get);
router.put("/mail/:id", mailController.update);
router.delete("/mail/:id", mailController.delete);

export default router;

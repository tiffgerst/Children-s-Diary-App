import express from "express";
import {
  singleUser,
  updateUser,
  createUser,
  deleteUser,
} from "../controllers/appUser.js";

const router = express.Router();

router.get("/:id", singleUser);
router.patch("/:id", updateUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);

export default router;

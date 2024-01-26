import express from "express";
const router = express.Router();
import { getPCCredentials, getSongs } from "../utils/planningcenter.js";
import query from "../db/db.js";

router.get("/", async (req, res) => {
  res.send("logged in");
});

// Log in
router.get("/login", async (req, res) => {
  res.redirect(
    `https://api.planningcenteronline.com/oauth/authorize?client_id=${process.env.PCCLIENTID}&redirect_uri=${process.env.REDIRECTURI}&response_type=code&scope=services people`
  );
});

export default router;

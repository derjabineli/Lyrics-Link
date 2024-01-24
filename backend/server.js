import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// Takes information from a request body and attaches it to request object
app.use(cors());
app.use(express.json());

app.use(router);
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

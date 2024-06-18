import app from "./app.js";

import { config } from "dotenv";

config();

app.listen(process.env.PORT, () =>
  console.log("Running Server on http://localhost:3000")
);

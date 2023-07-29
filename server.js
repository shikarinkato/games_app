import { app } from "./index.js";
import { connectToMongo } from "./data/db.js";
const port = process.env.PORT;
connectToMongo();

app.listen(port, () => {
  console.log(`Server is Working at Port http://localhost:${port}`);
});

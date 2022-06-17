const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./Routes/auth");
const MovieRoute = require("./Routes/MoviesRoutes");
const UserRoute = require("./Routes/UserRoutes");
const cors = require("cors");


const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

dotenv.config();

async function main() {
  await mongoose.connect(process.env.Mongo_url);
}

main()
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.log(err));


app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api", MovieRoute);
app.use("/api/User", UserRoute);

app.listen(8800, () => {
  console.log("Server is Running...");
});

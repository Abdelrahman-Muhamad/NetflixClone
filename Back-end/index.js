const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./Routes/Auth");
const userRoute = require("./Routes/users");
const movieRoute = require("./Routes/movies");
const listRoute = require("./Routes/lists");

dotenv.config();

//  CHECK YOUR DB CONNECTION    
mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => { console.log("Connected success") })
    .catch(err => console.log(err));
    

const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/movies", movieRoute);
app.use("/api/users", userRoute);
app.use("/api/lists", listRoute);

app.listen(8800, () => {
    console.log("listening to port 8800")
});
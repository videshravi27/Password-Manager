require("dotenv").config();

const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");

const detailRoutes = require("./routes/details");
const userRoutes = require("./routes/user");

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: ["https://password-manager-alpha-bay.vercel.app"],
    methods: ["POST", "GET", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/details", detailRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log("Listening on port", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

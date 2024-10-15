require("dotenv").config();

const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");

const detailRoutes = require("./routes/details");
const userRoutes = require("./routes/user");

const PORT = 4000;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/details", detailRoutes);
app.use("/api/user", userRoutes);

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

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

require("dotenv").config();
console.log("Mongo URI from .env:", process.env.MONGO_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

// import and register user routes
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

// Import and register user authentication routes

const userAuthRoutes = require("./routes/userauth");
app.use("/api/users/auth", userAuthRoutes);

const postRoutes = require("./routes/posts");
app.use("/api/posts", postRoutes)

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
    res.send("SportsHive Backend Running!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

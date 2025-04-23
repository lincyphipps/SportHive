require("dotenv").config();
console.log("Mongo URI from .env:", process.env.MONGO_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// const allowedOrigins = [
//   "http://localhost:5173", // for local dev
//   "https://sport-hive.vercel.app" // for live Vercel site
// ];

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5000", 
        "https://sport-hive.vercel.app",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// import and register community routes
const communityRoutes = require("./routes/communities");
app.use("/api/communities", communityRoutes)

// import and register user routes
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

// Import and register user authentication routes
const userAuthRoutes = require("./routes/userauth");
app.use("/api/users/auth", userAuthRoutes);

// Import and register post routes
const postRoutes = require("./routes/posts");
app.use("/api/posts", postRoutes);

// Import and register event routes
const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);

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

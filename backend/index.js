// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const path = require('path');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const AuthRouter = require('./Routes/AuthRouter');
// const ProductRouter = require('./Routes/ProductRouter'); // Ensure this is the correct path to your ProductRouter file
//  // Ensure this is the correct path to your AuthRouter file
// require('dotenv').config();

// require('./Models/db'); // Ensure this is the correct path to your db.js file

// const PORT = process.env.PORT || 5000;
// app.get('/ping', (req, res) => {
//   res.send('pong');
// });

// app.use(bodyParser.json());
// app.use(cors());
// app.use('/auth', AuthRouter);
// app.use ('/products' , ProductRouter); // Ensure this is the correct path to your ProductRouter file

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Middleware
// app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err))

// // API routes
// app.use("/api", require("./Routes/Index"))

// // Serve static assets in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static(path.join(__dirname, "../frontend/build")))

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
//   })
// }

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Routers
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const ApiRoutes = require("./Routes/Index"); // Make sure this file exists
const { connect } = require("./Connections/DatabaseConnection/connection");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
require("./Models/db"); // This should connect DB using mongoose.connect()

// Routes
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
app.use("/api", ApiRoutes); // Add your metals, sales, analytics APIs here

// Simple test route
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Static assets (Production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
}

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  const deleteAllMetals = async () => {
    try {
      const db = await connect(); // Connect to the database
      const metalsCollection = db.collection("metals");

      // Delete all metals by passing an empty filter object
      const result = await metalsCollection.deleteMany({});

      console.log(
        `✅ All metals deleted successfully, count: ${result.deletedCount}`
      );
      return result;
    } catch (error) {
      console.error("❌ Error deleting metals:", error.message);
      throw error; // Rethrow the error to handle it further up if needed
    }
  };
  // deleteAllMetals();
});

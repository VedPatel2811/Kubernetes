const express = require("express");
const mongoose = require("mongoose");
const Employee = require("./AuthenticationDB");

const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json()); // Middleware to parse JSON bodies

// Database Connection
async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://marketplace:abcd%401234@marketplace.gsv4e.mongodb.net/marketplaceDB"
  );
}
connectDB();

// Middleware for validating request body
async function authMiddleware(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password are required." });
  }
  next();
}

// Error Handler Middleware
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: "An internal server error occurred." });
}

// Login Route
app.post("/login", authMiddleware, async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find employee by email
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({ error: "Invalid Email." });
    }

    // Validate password
    if (employee.password !== password) {
      return res.status(400).json({ error: "Invalid Password." });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (err) {
    next(err); // Pass errors to the error handler
  }
});

// Use error handler middleware
app.use(errorHandler);

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

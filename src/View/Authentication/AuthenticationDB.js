const mongoose = require("mongoose");

// Employee Schema
const employeeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  level: {
    type: String,
  },
});

// Export the Employee model
module.exports = mongoose.model("Employee", employeeSchema);

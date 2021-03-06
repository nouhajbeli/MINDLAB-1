var mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var studentSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  library: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
  image: String,
  about: String,
  firstName: String,
  lastName: String,
  mobile: String,
  location: String,
  experience: Array,
  social: Object,
  role: {
    type: String,
    enum: ["instructor", "student", "admin"],
    default: "student"
  },
  following: {
    type: [String]
  },
  status: {
    type: String,
    enum: ["active", "banned", "unverified"],
    default: "active"
  },
  provider: String
});
studentSchema.methods.isValid = function (hashedpassword) {
  return bcrypt.compareSync(hashedpassword, this.password);
};

var Student = mongoose.model("Student", studentSchema);

module.exports.Student = Student;

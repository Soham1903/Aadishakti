  import ErrorHandler from "../error/error.js";
  import { User } from "../model/userSchema.js";

<<<<<<< HEAD
const signup = async (req, res, next) => {
  try {
    const { name, email, phoneno, gender, password } = req.body;
    // console.log (req.body);
    // Validate required fields
    if (!name || !email || !phoneno || !gender || !password) {
      return res.status(400).json({ message: "All fields are required" });
=======
  const signup = async (req, res, next) => {
    try {
      const { name, email, phoneno, gender, password } = req.body;

      // Validate required fields
      if (!name || !email || !phoneno || !gender || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Create new user
      const newUser = await User.create({
        name,
        email,
        phoneno,
        gender,
        password,
      });

      return res.status(201).json({
        message: "User registered successfully",
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error, please try again later" });
>>>>>>> 29492aac34daada491a511dae1ffb7514735f3d6
    }
  };

  export default signup;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");

exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username: username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate username and password against the database
    const user = await User.findOne({ username });
    console.log("User from database:", user);

    const trimmedPassword = password.trim();
    if (!user || !bcrypt.compareSync(trimmedPassword, user.password)) {
      console.error("Invalid username or passworddd");
      return res.status(401).json({ error: "Invalid username or password" });
    }

    console.log("Stored Password:", user.password);
    console.log("Provided Password:", password);

    // Generate a JWT
    const token = jwt.sign({ username: "testuser" }, "your_key", {
      expiresIn: "600", // Set the expiration time for the token
    });

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
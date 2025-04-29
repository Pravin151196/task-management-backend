import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });
    res.status(201).json({ msg: "User created" });
  } catch (err) {
    res.status(500).json({ msg: "Error creating user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    }).json({ msg: "Login successful" });
  } catch (err) {
    res.status(500).json({ msg: "Login error" });
  }
};

export const verify = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(200).json({ auth: false });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ auth: true });
  } catch {
    res.status(200).json({ auth: false });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").json({ msg: "Logged out" });
};

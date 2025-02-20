import bcrypt from "bcrypt";
import { insertUser, getUserByEmail } from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

// REGISTER a new user
export const registerUser = async (req, res) => {
  try {
    const { user_name, user_email, user_password } = req.body;

    // Check if any required field is missing
    if (!user_name || !user_email || !user_password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the email is valid
    if (!isEmail.test(user_email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if the user with the same email already exists
    const existingUser = await getUserByEmail(user_email);
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user_password, salt);

    // Create a new user
    const newUser = {
      user_name,
      user_email,
      user_password: hashedPassword,
    };

    // Insert the new user into the database
    const user = await insertUser(newUser);

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GENERATE ACCESS TOKEN
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.user_id,
      // admin: user.role === "ADMIN",
      role: user.role,
      // admin: user.role === "ADMIN",
    },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: "10d",
    }
  );
};

//GENERATE REFRESH TOKEN
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.user_id,
      // admin: user.role === "ADMIN",
      role: user.role,
      // admin: user.role === "ADMIN",
    },
    process.env.JWT_REFRESH_KEY,
    {
      expiresIn: "365d",
    }
  );
};

// LOGIN a user
export const loginUser = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    // Check if any required field is missing
    if (!user_email || !user_password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if the email is valid
    if (!isEmail.test(user_email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Get the user from the database
    const user = await getUserByEmail(user_email);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Compare passwords
    const isValidPassword = await bcrypt.compare(
      user_password,
      user.user_password
    );

    if (!isValidPassword) {
      return res.status(401).json({ error: "Wrong password!" });
    }

    // Generate access token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      //après déloyer le site, changer "secure:true"
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    // Remove sensitive information from user object, just return others information except password
    const { user_password: _, ...others } = user;

    // Return user data and access token
    res.status(200).json({ user: others, accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// LOG OUT
export const logoutUser = async (req, res) => {
  // Get the refresh token from the cookie
  const refreshToken = req.cookies.refreshToken;

  // Clear the refresh token from cookies
  res.clearCookie("refreshToken");

  // Remove the refresh token from storage
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

  res.status(200).json("Log out successfully");
};

// Temporary storage for refresh tokens (replace with Redis in production)
let refreshTokens = [];

// REQUEST REFRESH TOKEN
export const requestRefreshToken = async (req, res) => {
  // Get the refresh token from the cookie
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json("You're not authenticated !");
  }

  // Check if the refresh token is valid
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
    if (err) {
      console.log(err);
    }

    // Remove the old refresh token from storage
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    // Generate new access token and refresh token
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Save the new refresh token to storage
    refreshTokens.push(newRefreshToken);

    // Set the new refresh token as a cookie in the response
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false, // Change to true in production
      path: "/",
      sameSite: "strict",
    });

    // Return the new access token
    res.status(200).json({ accessToken: newAccessToken });
  });
};

// // LOG OUT
// export const logoutUser = async (req, res) => {
//   res.clearCookie("refreshToken");
//   refreshTokens = refreshTokens.filter(
//     (token) => token !== req.cookies.refreshToken
//   );
//   res.status(200).json("Log out successfully");
// };

// //luu tru tam thoi refresh token ( sau do co the thay the bang redis) R1
// let refreshTokens = [];
// export const requestRefreshToken = async (req, res) => {
//   //prendre le refresh token de l'utilisateur
//   const refreshToken = req.cookies.refreshToken;
//   if (!refreshToken) return res.status(401).json("You're not authenticated !");
//   //R2
//   if (!refreshTokens.includes(refreshToken))
//     return res.status(403).json("Refresh token is not valid!");
//   jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
//     if (err) {
//       console.log(err);
//     }
//     //R3
//     refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
//     // Créer un nouveau accessToken, refreshToken
//     const newAccessToken = generateAccessToken(user);
//     const newRefreshToken = generateRefreshToken(user);
//     //R4
//     refreshTokens.push(newAccessToken);
//     res.cookie("newRefreshToken", newRefreshToken, {
//       httpOnly: true,
//       //après déloyer le site, changer "secure:true"
//       secure: false,
//       path: "/",
//       sameSite: "strict",
//     });
//     res.status(200).json({ accessToken: newAccessToken });
//   });
// };

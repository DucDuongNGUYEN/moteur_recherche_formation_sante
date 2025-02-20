import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid !");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(403).json("You're not authenticated !");
  }
};

export const verifyTokenAdminAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id == req.params.id || req.user.role === "ADMIN") {
      next();
    } else {
      return res.status(403).json("You're not allowed");
    }
  });
};

export const verifyTokenFormateurAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.id == req.params.id ||
      req.user.role === "FORMATEUR" ||
      req.user.role === "ADMIN"
    ) {
      next();
    } else {
      return res.status(403).json("You're not allowed");
    }
  });
};

export const verifyTokenUserAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (
      req.user.id == req.params.id ||
      req.user.role === "USER" ||
      req.user.role === "FORMATEUR" ||
      req.user.role === "ADMIN"
    ) {
      next();
    } else {
      return res.status(403).json("You're not allowed");
    }
  });
};

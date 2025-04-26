import jwt from "jsonwebtoken";
export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
};
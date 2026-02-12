require("dotenv").config();

module.exports = (req, res, next) => {
  const clientKey = req.headers["x-api-key"];

  console.log("Incoming key:", clientKey);
  console.log("ENV key:", process.env.API_KEY);

  if (!clientKey) {
    return res.status(401).json({ error: "Missing x-api-key" });
  }

  if (clientKey !== process.env.API_KEY) {
    return res.status(403).json({ error: "Invalid API Key" });
  }

  next();
};

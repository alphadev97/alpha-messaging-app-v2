import express from "express";

const app = express();
const port = 5000;

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});

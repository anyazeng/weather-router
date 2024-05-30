const express = require("express");
const weatherRouter = require("./weatherRouter");
const app = express();

app.use(express.json());
app.use("/api", weatherRouter);
PORT = 4000;
app.listen(PORT, () => {
  console.log(`Sever is listening on port ${PORT}`);
});

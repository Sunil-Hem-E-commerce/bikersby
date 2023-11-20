const express = require("express");

const config = require("./utils/config");

const app = express();
const PORT = config.SERVER_PORT;

app.listen(PORT, () => {
  console.log("Sever is now listening at port 3001");
});

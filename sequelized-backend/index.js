const app = require("./app.js");
const config = require("./utils/config");

const PORT = config.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Sever is now listening at port ${PORT}`);
});

const app = require("./app.js");
const config = require("../Final_backend/utils/config.js");

const PORT = config.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Sever is now listening at port ${PORT}`);
});

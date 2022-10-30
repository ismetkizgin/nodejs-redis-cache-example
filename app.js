require("dotenv/config");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(require("./routers/book"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

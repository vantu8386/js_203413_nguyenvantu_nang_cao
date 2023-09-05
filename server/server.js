const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const port = 3000;

const app = express();

const usersRoute = require("./routers/users.route");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/v1/users", usersRoute);

app.listen(port, (err, res) => {
  console.log(`http://localhost:${port}`);
});

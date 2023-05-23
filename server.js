const express = require("express");
const cors = require("cors");
const { sequelizeConect, Sequelize } = require("./app/models");

const app = express();
let corsOption = {
  origin: "http://localhost 3030",
};
app.use(cors(corsOption));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const db = require("./app/models");
const biodata = require("./app/controllers/biodata.controller.js");
db.sequelizeConect
  .sync()
  .then(() => {
    console.log("Sync DB");
  })
  .catch((err) => {
    console.error("Failed to sync db : " + err.message);
  });

app.get("/", (req, res) => {
  biodata.findAll(req, res);
});
app.get("/:id", (req, res) => {
  biodata.findOne(req, res);
});
app.post("/", (req, res) => {
  biodata.create(req, res);
});
app.put("/:id", (req, res) => {
  biodata.update(req, res);
});
app.delete("/:id", (req, res) => {
  biodata.delete(req, res);
});
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

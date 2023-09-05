const express = require("express");
const route = express.Router();
const db = require("../utils/database");

route.get("/", async (req, res) => {
  try {
    const dataUsers = await db.execute("SELECT * FROM users");
    let [rows] = dataUsers;
    res.json({
      users: rows,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dataUsers = await db.execute(
      "SELECT * FROM users WHERE id_user = ?",
      [id]
    );
    let [rows] = dataUsers;
    res.json({
      users: rows,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

route.post("/", async (req, res) => {
  const { name, description} = req.body;
  try {
    await db.execute("INSERT INTO users ( name, description) VALUES (?,?)", [
      name,
      description,
   
    ]);
    // console.log(dataUsers);
    res.status(200).json({
      message: "thêm thành công",
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

route.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const dataUsers = await db.execute(
      "UPDATE users SET name =?, description =? WHERE id_user = ? ",
      [name, description, id]
    );
    if (dataUsers[0].affectedRows === 0) {
      res.status(404).json({
        message: `Không tìm thấy id: ${id}},`,
      });
    } else {
      res.status(200).json({
        message: `Sửa thành công id: ${id}`,
        name: name,
        description: description,
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dataUsers = await db.execute(
      "DELETE FROM users WHERE ( id_user = ?)",
      [id]
    );
    if (dataUsers[0].affectedRows === 0) {
      res.status(404).json({
        message: `Không tìm thấy id: ${id}`,
      });
    } else {
      res.status(200).json({
        message: `xóa thành công id: ${id}`,
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

module.exports = route;

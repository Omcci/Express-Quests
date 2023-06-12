const database = require("./database");

const getUsers = (req, res) => {
  let sql = "SELECT * FROM users"
  const sqlValues = [];

  if (req.query.language != null) {
    sql += " WHERE language = ?"
    sqlValues.push(req.query.language)

    if (req.query.city != null) {
      sql += " and city = ?"
      sqlValues.push(req.query.city)
    }
  } else if (req.query.city != null) {
    sql += " WHERE city = ?"
    sqlValues.push(req.query.city)
  }

  

  database
    .query(sql, sqlValues)
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      users[0] != null ? res.json(users[0]) : res.status(404).send("Not found");
      // console.log("users", users[0])
      // res.json(users[0])
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });

  // const user = users.find((user) => user.id === id);

  // if (user != null) {
  //   res.json(user);
  // } else {
  //   res.status(404).send("Not Found");
  // }
};

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;
  console.log(hashedPassword)
  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language, hashedPassword]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

const updateUser = (req, res) => {
  const id = +req.params.id;
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;

  database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? WHERE id = ?",
      [firstname, lastname, email, city, language, hashedPassword, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not found");
      } else {
        
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the user");
    });
};

const deleteUser = (req, res) => {
  const id = +(req.params.id)

  database
  .query(
    "DELETE FROM users WHERE id = ?", [id]
  )
  .then(([result]) => {
    if (result.affectedRows === 0) {
      res.status(404).send("Not found")
    } else {
      res.sendStatus(204)
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error deleting the user");
  });
}

module.exports = {
  getUsers,
  getUsersById,
  postUser,
  updateUser,
  deleteUser,
};

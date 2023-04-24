const users = [
    {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        city: 'Paris',
        language: 'English'
      },
      {
        id: 2,
        firstname: 'Valeriy',
        lastname: 'Appius',
        email: 'valeriy.appius@example.com',
        city: 'Moscow',
        language: 'Russian'
      },
      {
        id: 3,
        firstname: 'Ralf',
        lastname: 'Geronimo',
        email: 'ralf.geronimo@example.com',
        city: 'New York',
        language: 'Italian'
      },
  ];


  const database = require("./database");

  const getUsers = (req, res) => {
    database
    .query("select * from users")
    .then(([users]) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database")
  
    });
  }

  const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      users[0] != null ? res.json(users[0]) : res.status(404).send("Not found")
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send("Error retrieving data from database");
    });
  
    const user = users.find((user) => user.id === id);
  
    if (user != null) {
      res.json(user);
    } else {
      res.status(404).send("Not Found");
    }
  };
  
  module.exports = {
    getUsers,
    getUsersById,
  };
  
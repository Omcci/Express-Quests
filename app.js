require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json())

const port = process.env.APP_PORT ?? 8000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list and look at our user database ;))))))");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./userHandlers");
const { validateMovie, validateUser } = require("./validator");
const { hashPassword } = require("./auth.js");


app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", usersHandlers.getUsers)
app.get("/api/users/:id", usersHandlers.getUsersById);
app.post("/api/movies", validateMovie, movieHandlers.postMovie)
:d, usersHandlers.postUser)
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie)
app.put("/api/users/:id",  hashPassword, usersHandlers.updateUser)
app.delete("/api/movies/:id", movieHandlers.deleteMovie)
app.delete("/api/users/:id", usersHandlers.deleteUser)




app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

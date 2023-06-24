const argon2 = require("argon2");
const jwt = require("jsonwebtoken")




// const hashPassword = (req, res, next) => {
//   argon2
//     .hash(req.body.password, hashingOptions)
//     .then((hashedPassword) => {
//       console.log(hashedPassword);

//       req.body.hashedPassword = hashedPassword;
//       delete req.body.password;

//       next();
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

const hashPassword = async (req, res, next) => {
  let password = req.body.password
  // const hashingOptions = {
  //   type: argon2.argon2id,
  //   memoryCost: 2 ** 16,
  //   timeCost: 5,
  //   parallelism: 1,
  // };
  try {
    let hashedPassword = await argon2.hash(password)

    
    // la promesse retounne le mdp hasher
    // écraser le mdp clair
    req.body.password = hashedPassword
    next()
} catch(err) {
    console.log(err);
    res.sendStatus(500)
}
};


const verifyPassword = (req, res) => {
  console.log("WHAT", req.body.password);
  console.log("LOL", req.users.password);

  argon2
    .verify(req.users.password, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.users.id };
        console.log("JWT", process.env.JWT_SECRET);
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        delete req.users.password;
        res.send({ token, user: req.users });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};


const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get('Authorization');
    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};


module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken
};
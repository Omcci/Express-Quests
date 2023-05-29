// const validateMovie = (req, res, next) => {
//     const { title, director, year, color, duration } = req.body;
//     const errors = []

  
//     if (title == null) {
//       errors.push({field: "title", message: "This field is required"});
//     }
//     if (title.length >= 255) {
//         errors.push({field: "title", message: "This field is limited to 255 characters"});
//     }
//      if (director == null) {
//       errors.push({field: "director", message: "This field is required"});
//     } 
//     if (director.length >= 255) {
//         errors.push({field: "director", message: "This field is limited to 255 characters"});
//     }
//     if (year == null) {
//         errors.push({field: "year", message: "This field is required"});
//     } 
//     if (year.length >= 255) {
//         errors.push({field: "year", message: "This field is limited to 255 characters"});
//     }
//     if (color == null) {
//         errors.push({field: "color", message: "This field is required"});
//     } 
//     if (color.length >= 255) {
//         errors.push({field: "color", message: "This field is limited to 255 characters"});
//     }
//     if (duration == null) {
//         errors.push({field: "duration", message: "This field is required"});
//     } 
//     if (errors.length) {
//         res.status(422).json({ validationErrors: errors})
//     }
//     else {
//       next();
//     }
//   };


//   const validateUser = (req, res, next) => {
//     const { email } = req.body;
//     const errors = [];
  
//     // ...
  
//     const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
  
//     if (!emailRegex.test(email)) {
//       errors.push({ field: 'email', message: 'Invalid email' });
//     }
  
//     // ...
  
//     if (errors.length) {
//       res.status(422).json({ validationErrors: errors });
//     } else {
//       next();
//     }
//   };

const { body, validationResult } = require('express-validator')

const validateUser = [
    body("email")
    .isEmail()
    .isLength({ min:1, max : 255})
    .withMessage('Email is required and must be less than 255 characters'),
    body("firstname")
    .isLength({ min:1, max : 255})
    .withMessage('Firstname is required and must be less than 255 characters'),
    body("lastname")
    .isLength({ min: 1, max : 255})
    .withMessage('Lastname is required and must be less than 255 characters'),
    body("city")
    .isLength({ max : 255})
    .withMessage('City must be less than 255 characters '),
    body("language")
    .isLength({ max : 255})
    .withMessage('Language must be less than 255 characters '),
    (req,res,next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(422).json({validationErrors : errors.array()})
        } else {
            next()
        }
    },
]



const validateMovie = [
    
    body("title")
    .isLength({ min: 1, max : 255})
    .withMessage('Title is required and must be less than 255 characters'),
    body("director")
    .isLength({ min: 1, max : 255})
    .withMessage('Director is required and must be less than 255 characters'),
    body("year")
    .isLength({ min: 1, max : 255})
    .withMessage('Year is required and must be less than 255 characters'),
    body("color")
    .isLength({ min: 1, max : 255})
    .withMessage('Color is required and must be less than 255 characters'),
    body("duration")
    .isLength({ min: 1})
    .withMessage('Duration is required'),
    
    (req,res,next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(422).json({validationErrors : errors.array()})
        } else {
            next()
        }
    },
]

module.exports = {
    validateMovie, validateUser
}
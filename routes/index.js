var express = require('express');
var router = express.Router();
const{body, validationResult} = require("express-validator")
const bcrypt = require("bcrypt")
var unhasedpassword = "test12345"
var hasedpassword = "$2b$10$p0dd8l2/f3pJic.zYQ5/x.xFtlOuPG4DjSemDrVqPIAWxlLShDZ4m" 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create', 
body("username").isAlphanumeric(), 
body("password").isLength({min: 7}), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({errors: errors.array()});
  }

  console.log(`username: ${req.body.username}`);
  console.log(`password: ${req.body.password}`);

  const saltRounds = 10;

  bcrypt.hash(req.body.password, saltRounds, (err, hash)=> {
    if (err) {
      throw err;
    }
    console.log(`hased password: ${hash}`);
  })
  

  
});

module.exports = router;

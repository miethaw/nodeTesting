const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.get('/people', (req, res) => {
    const data=[
        { name : "Mie mie", age: 23 },
        { name : "Nyunt Nyunt", age: 18 },
    ];
    return res.status(200).json(data)
})

router.get('/people/:id', (req, res) => {
    const id =req.params.id;
    return res.status(200).json({id})
})

router.get('/list',(req,res)=>{
    let sql = `select * from travel_records`;
    db.query(sql,(err,data,fields)=>{
        if(err) throw err;
        res.json({
            status:200,
            data,
            message: "Successfully retrieved!,People who are in travel"
        })
    })
});


// router.post('/new-travel-records',(req,res)=>{
//     let sql= `INSERT INTO travel_records(name,NRC,Place_From,Place_To,Go_With) VALUES(?)`;
//     console.log("Name",req)
//     let values=[
//         req.body.name,
//         req.body.nrc,
//         req.body.from,
//         req.body.to,
//         req.body.with
//     ];
//     db.query(sql,[values],(err,data,fields)=>{
//         if(err) throw err;
//         res.json({
//             status:201,
//             message:'New records successfully created!'
//         })

//     })
// })
router.post('/new-travel-records', function(req, res) {
    let sql = `INSERT INTO travel_records(name,NRC,Place_From,Place_To,Go_With) VALUES (?)`;

    let values = [
        req.body.name,
        req.body.nrc,
        req.body.from,
        req.body.to,
        req.body.with
    ];
    db.query(sql, [values], function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 201,
        message: "New records successfully created!"
      })
    })
  });

  router.get('/test',(req,res)=>{
    // return res.json(req.query);
    console.log(">>>",req.query.from)
    let sql= `select * from travel_records where Place_From=${req.query.from}`;
    db.query(sql,(err,data,fields)=>{
        if(err) throw err;
        res.json({
            status:200,
            data
        })
    })
});

router.post(
    '/user',
    // username must be an email
    body('username').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
    (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user=[
        {
            username: req.body.username,
            password: req.body.password,
          }
      ];
      return res.json({
        status: 201,
        message: "Login successfully!",
        user
      })
    },
  );

module.exports = router;
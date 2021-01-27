const express = require('express')
const router = express.Router();

router.get('/people/', (req, res) => {
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

module.exports = router;
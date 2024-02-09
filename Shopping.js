const express = require('express')
const router = express.Router()
const ExpressError = require("./ExpressError")
const items = require("./fakeDb")

router.get('/', (req, res, next) => {
    res.send({"items": items})
})

router.post('/', (req, res, next) => {
    items.push(req.body)
    res.status(201).send({"added": req.body})
})

router.get('/:name', (req, res, next) => {
    const item = items.find(i => i.name == req.params.name)
    res.send(item)
}) 

router.patch('/:name', (req, res, next) => {
    const oldItem = items.find(item => item.name == req.params.name)
    if (req.body.name){
        oldItem.name = req.body.name
    }
    if (req.body.price){
        oldItem.price = req.body.price
    }
    res.send({"updated": oldItem})
})

router.delete('/:name', (req, res, next) => {
    const idx = items.findIndex(i => i.name == req.params.name)
    items.splice(idx, 1)
    res.send({"message": "Deleted"})
})


module.exports = router
import express from 'express';

let carts = [
    { id: 10, name: "pelota" }, 
    { id: 11, name: "polera" }, 
    { id: 12, name: "chalas" }];

export const cartRouter = express.Router();

cartRouter.get("/", (req, res) => {
    res.status(200).json({
        status: "sucess",
        msg: "the route exists",
        data: carts,
    })
})

cartRouter.post("/", (req, res) => {
    const newCart = req.body
    newCart.id = Number((Math.random() * 10000000).toFixed(0))
    carts.push(newCart)
    res.status(201).json({
        status: "sucess",
        msg: "cart created",
        data: newCart,
    })
})
import express from 'express';
import CartManager from '../cartManager.js';

export const cartRouter = express.Router();

const cartContainer = new CartManager("./src/carts.json");


cartRouter.get("/",async (req, res) => {
    try{
        const carts = await cartContainer.getCarts()
        res.status(200).json({
            status: "sucess",
            msg: "the route exists",
            data: carts,
        })
    }catch(error){
        res.status(200).json({
            status: "error",
            msg: "the route dont exist",
        })
    }
})

cartRouter.get("/:cid",async (req, res) => {
    try{
        const id = req.params.cid
        const carts = await cartContainer.getCartsByid(id)
        if(carts){
            res.status(200).json({
                status: "success",
                msg: "the id exists",
                payload: carts})
        }else{
            res.status(404).json({Error:'Cart not found, try whit a valid id'})
        }

    }catch(error){
        res.status(500).json({
            status: "error",
            msg:'Cart not found, try with a valid id',
        })
    }
})


cartRouter.post("/", async(req, res) => {
    try{
        const data = req.body
        const newCart = await cartContainer.addCart(data)
        if(newCart){
            return res.status(201).json({
                status:"success",
                msg: "Cart added successfully",
                payload: newCart,
            })
        }else{
            res.status(400).json({
                status: "error",
                msg:'Error adding a new Cart',
            })
        }
    }catch(error){
        res.status(500).json({
            status: "error",
            msg:'internal error',
        })

    }
    
})
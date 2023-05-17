import express from 'express';
import ProductManager from '../productManager.js';

export const productsRouter = express.Router();

const container = new ProductManager("./src/products.json");

productsRouter.get("/",async (req, res) => {

    try{
        const limit = req.query.limit
        const products = await container.getProducts()
        if(limit >= 1){
            res.status(200).json({
                status: "success",
                data: products.slice(0, limit)
            })
        }else{
            res.status(404).json({message: 'Error , the limit is out of range'})
        }

    }catch(error){
        res.status(404).json({msg:'Internal Error'})
    }
    
})

productsRouter.get("/:pid",async (req,res) => {
    try{
        const id = req.params.pid
        const product = await container.getProductByid(parseInt(id))
        if(product){
            res.status(200).json(product)
        }else{
            res.status(404).json({error:'Product not found, try with a valid id'})
        }
    }catch(error){
        res.status(500).json({
            status: "error",
            msg:'Product not found, try with a valid id',
        })
    }
    
})

productsRouter.post("/", async (req, res) => {
    try{
        const data  = req.body
        const newProduct = await container.addProduct(data)
        if(newProduct){
            return res.status(201).json({
                status: "success",
                msg: "Product added successfully",
                payload: newProduct,
            })       
        }else{

        
        res.status(400).json({
            status: "error",
            msg:'Error adding product or code duplicated',
        })}
    }catch(error){
         res.status(500).json({
            status: "error",
            msg:'Internal Error',
        })
    }
})

productsRouter.put("/:pid", async (req,res) => {
    const id = parseInt(req.params.pid)
    const update = req.body
    try{
        const productUpdate = await container.updateProduct(id, update)
        res.status(200).json({
            status: "success",
            msg: "Product updated successfully",
            data: productUpdate})
    }catch(error){
        res.status(400).json({
            status: "error",
            msg:'The product whit that id , dont exist ',
        })
    }
})

productsRouter.delete("/:pid", async (req,res) => {
    const id = parseInt(req.params.pid)
    try{
        const productDeleted = await container.deleteProduct(id)
        res.status(200).json({
            status: "success",
            msg:'Product deleted successfully',
            data: productDeleted,

        })
    }catch(error){
        res.status(400).json({
            status: "error",
            msg:'An error occurred while deleting the product',
        })
    }
})
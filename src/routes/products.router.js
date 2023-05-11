import express from 'express';
import ProductManager from '../productManager.js';

export const productsRouter = express.Router();

const container = new ProductManager("./src/products.json");

productsRouter.get("/",async (req, res) => {

    try{
        const limit = req.query.limit
        const products = await container.getProducts()
        if(limit <= 10){
            res.status(200).json(products.slice(0, limit))
        }else if(limit >= 11 || limit <= 0){
            res.status(404).json({message: 'Error , the limit is out of range (1 to 10)'})
        }else{
            res.status(200).json(products)
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
            msg:'Internal Error',
        })
    }
    
})

productsRouter.post("/", async (req, res) => {
    try{
        const data = await container.getProducts()
        let newProduct = req.body;
        let findCode = (data.find((ele) => ele.code === newProduct.code))
        if (findCode) {
            return res.status(400).json({
                status: "Error",
                msg: "Error. A product with the same code you are trying to save already exists. Please try again"
            })
        }
        const requiredField = ['title', 'desc', 'code', 'price', 'stock', 'category']
        const hasAllFields = requiredField.every(prop => newProduct[prop]);
        if (hasAllFields) {
            await container.addProduct({ ...newProduct, status: true })
            return res.status(201).json({
                status: "Success",
                msg: "product saved",
                data: newProduct
            })
        } else {
            return res.status(409).json({
                status: "Error",
                msg: "An error occurred while trying to save the product. Check that all required fields are filled out and you are not manually giving an id"
            })
        }
    }catch(error){
         res.status(500).json({
            status: "error",
            msg:'Internal Error',
        })
    }
})
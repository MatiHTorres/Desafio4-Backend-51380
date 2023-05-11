import express from 'express';
import ProductManager from './productManager.js';
import { productsRouter} from './routes/products.router.js'
import { cartRouter } from './routes/carts.router.js';

// const ProductManager = require('./tercerDesafio') commonjs

const container = new ProductManager("./src/products.json");

const app = express();
const port = 8080;

// NECESARIO PARA INTERPRETAR LOS JSON POR DEFECTO / MIDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)


// app.get("/api/products",async (req, res) => {

//     try{
//         const limit = req.query.limit
//         const products = await container.getProducts()
//         if(limit <= 10){
//             res.status(200).json(products.slice(0, limit))
//         }else if(limit >= 11 || limit <= 0){
//             res.status(200).json({message: 'Error , the limit is out of range (1 to 10)'})
//         }else{
//             res.status(200).json(products)
//         }
//     }catch(error){
//         res.status(404).json({message: 'We have an error'})
//     }
    
// })



// app.post("/products" , async (req,res) => {
//     try{
//         const product = req.body
//         products.push({

//         })
//     }catch(error){
//         res.status(404).json({error:'We have an error'})
//     }
// })


app.listen(port, () => {
    console.log(`Server listening on PORT 8080 http://localhost:${port}`)
})


app.get("*", (req,res) => {
    res.status(404).json({
        status: "error",
        msg: "the route dont exist",
        data: {},
    })
})
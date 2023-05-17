import express from 'express';

import { productsRouter} from './routes/products.router.js'
import { cartRouter } from './routes/carts.router.js';


const app = express();
const port = 8080;

// NECESARIO PARA INTERPRETAR LOS JSON POR DEFECTO / MIDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)



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
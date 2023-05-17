import fs from 'fs';
import { v4 as uuid } from 'uuid';

// const fs = require("fs");


class ProductManager {
    constructor(path){
        this.path = path
    }

    async addProduct(product) {
        const products = await this.getProducts()
        let checkCode = products.find((prod) => prod.code === product.code)
        if(!checkCode){
            if(product.title && product.description && product.price && product.thumbnail && product.code && product.stock){
                    
                // Aqui transformo el UUID de un codigo alfanumero a uno totalmente numerico , para poder buscarlo por id
                const id = uuid()
                const uuidToInt = parseInt(id, 16)
                console.log(uuidToInt) 


                let newProduct = {...product,status: true,id: uuidToInt}

                products.push(newProduct)
                // console.log(JSON.stringify(products, null, 2))
                await fs.promises.writeFile(this.path,JSON.stringify(products, null, 2))
    
                return newProduct
            } else {
                throw new Error("Error , fields missing")
            }
         
        } else {
            return console.log('This CODE already exists')   
        }
   
        
    }

    async getProducts(){
        try{  
            const allProducts = await fs.promises.readFile(this.path,"utf-8")
            return JSON.parse(allProducts)
            
        }catch(err){
            return []
        }
        
    }

    async getProductByid(id){
        const products = await this.getProducts()
        let found = products.find((prod) => prod.id == id)
        const thisId = found.id
        console.log(thisId)
        if(found){
            console.log('Product found successfully')
            return found
        } else {
            return console.log('Product not found')
        }
    }

    async updateProduct(id,updates){
        await this.deleteProduct(id)
        const products = await this.getProducts()
        updates.status = true
        updates.id = id 
        console.log(updates)
        let prodUpdate = [updates,...products]
        await fs.promises.writeFile(this.path, JSON.stringify(prodUpdate,null,2))

    }

    async deleteProduct(id){
        const products = await this.getProducts()
        let productFilter = products.filter((prod) => prod.id != id)

        await fs.promises.writeFile(this.path,JSON.stringify(productFilter,null,2))
    }
}


const proManager = new ProductManager("./src/products.json")


export default ProductManager;
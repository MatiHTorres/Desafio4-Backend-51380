import fs from 'fs';
import { v4 as uuid } from 'uuid';

class CartManager{
    constructor(path){
        this.path = path;
    }

    async addCart(){
        const carts = await this.getCarts()

        const id = uuid()
        const uuidToInt = parseInt(id, 16)
        
        const productId = uuid()
        const productIdtoInt = parseInt(productId,8)

        let newCart = {id: uuidToInt,products: [{id: productIdtoInt}]}
        carts.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts,null,2))
        return newCart

    }

    async getCarts(){
        try{
            const allCarts = await fs.promises.readFile(this.path,"utf-8")
            return JSON.parse(allCarts)
        }catch(e){
            return []
        }
    }

    async getCartsByid(id){
        const carts = await this.getCarts()
        let found = carts.find((cart) => cart.id == id)
        const thisId = found.id
        console.log(thisId)
        if(found){
            console.log('Cart found successfully')
            return found
        } else {
            return console.log('Cart not found')
        }
    }
}

export default CartManager;
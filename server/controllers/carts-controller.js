const Cart = require ("../models/cart")
// const Item =  require ("../models/item")
const mongoose=require('mongoose')

module.exports={
    getCartbyCustomerId:(req,res,next)=>{
        Cart.findOne({customer_id:req.params.id})
        .then(cart=>{
            res.locals.cart=cart
            next()
            res
                .status(200)
                .json(cart)
            // res.send(cart)
        })
        .catch(err=>{
            res.send(err)
        })
    },
    addToCart:(req,res,next)=>{
        Cart.findOne({customer_id:req.params.id})
        .then(cart=>{
            if(cart==null){
                 //DISINI KALO CARTNYA BELOM ADA, KEBIKIN BARU
                let item={
                    _id:req.body.itemid,
                    item_name:req.body.item_name,
                    item_price:req.body.item_price,
                    item_description:req.body.item_description,
                    pic_url:req.body.pic_url,
                    total:Number(req.body.total)
                }

                let newCart = new Cart({
                    customer_id:req.params.id,
                    items:[item]
                })
    
                newCart.save()
                .then(newcart=>{
                    res.status(200).json(newcart)
                })
                .catch(err=>{
                    res.send(err)
                })
            }
            else{
            //  disini kalo dapet cartnya
                let item={
                    _id:req.body.itemid,
                    item_name:req.body.item_name,
                    item_price:req.body.item_price,
                    item_description:req.body.item_description,
                    pic_url:req.body.pic_url,
                    total:Number(req.body.total)
                }

                cart.items.push(item)
                // cart.items.push(mongoose.Types.ObjectId(req.body.itemid))
                updateCart(cart)

            //function buat updateCart
                function updateCart(updatedCart){
                    Cart.findByIdAndUpdate(cart._id,updatedCart)
                    .then(updateCart=>{
                    res.send(updateCart)
                    })
                    .catch(err=>{
                        res.send(err)
                    })
                }
             
            }
        })
        .catch(error=>{
            res.send(error)
        })
    },
    updateCart:(req,res,next)=>{
        console.log("ga kenpanggil ya ")
        var itemid=req.body.itemid

        var cart = res.locals.cart
        var updatedcart=cart.items.filter(function(cart){
            return cart._id!==itemid
        })

        cart.customer_id=req.params.id
        cart.items=updatedcart

        console.log("CART>ITEMS",cart.items)
            
        cart.save()
        .then(newCart=>{
            res.status(200).json(newCart)
        })
        .catch(err=>{
            console.log(err)
        })

    },
    deleteCart:(req,res,next)=>{
        Cart.findOneAndRemove({customer_id:req.params.customerid})
        .then(cart=>{
            res.status(200).json(cart)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }
}
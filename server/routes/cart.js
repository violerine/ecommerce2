var express = require('express');
var router = express.Router();
// var {
// newCart

// }=require('../controllers/cartbaru-controller')

var{


addToCart,
getCartbyCustomerId,
updateCart,
deleteCart

}=require('../controllers/carts-controller')

router.post('/add/:id',addToCart)
router.get('/:id',getCartbyCustomerId)
router.put('/:id',getCartbyCustomerId,updateCart)
router.delete('/delete/:customerid',deleteCart)
// router.delete('/delete/:id',deleteCart)
//disini id nya , id customer
// router.post('/add/:id',addToCart)

module.exports = router;
